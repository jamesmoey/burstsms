const rp = require('request-promise-native');

function bitlyLinkReplacer(token) {
  return link => rp(`https://api-ssl.bitly.com/v3/shorten?access_token=${token}&longUrl=${encodeURIComponent(link)}&format=txt`);
}

function initialiseLinkReplacer(replacer) {
  return message => {
    let bitlyPromises = [],
      linkMatched = [],
      m = null,
      regExp = new RegExp(/http[s]?:\/\/[\S]+/, 'gi');
    //get all the link in the message
    while ((m = regExp.exec(message)) !== null) {
      if (m.index === regExp.lastIndex) {
        regExp.lastIndex++;
      }
      linkMatched.push(m[0]);
    }
    if (linkMatched.length > 0) {
      bitlyPromises = linkMatched.map(replacer);
      return Promise.all(bitlyPromises).then(bitlyUrls => {
        let msg = message.slice();
        linkMatched.forEach((link, index) => {
          msg = msg.replace(link, bitlyUrls[index]);
        });
        return msg;
      }, e => {
        //if error just log the message and return the message
        console.error('error from bitly', e.message);
        console.trace(Error.stack);
        return message;
      });
    } else {
      //no link just return the message as is
      return Promise.resolve(message);
    }
  }
}

let replacer = initialiseLinkReplacer(bitlyLinkReplacer(process.env.bitly_token));

function handle(phone, message) {
  //replace leading 0 with 61. Assuming Australia number
  let cleanPhone = phone.replace(/^0/, '61');
  return replacer(message).then(msg => rp({
    uri: `https://api.transmitsms.com/send-sms.json`,
    qs: {
      message: msg,
      to: cleanPhone
    },
    auth: {
      user: process.env.burstsms_user,
      password: process.env.burstsms_password,
    }
  })).catch(e => {
    console.error('Error Burst SMS', e.message);
    console.trace(Error.stack);
    throw e;
  });
}

exports.initialiseLinkReplacer = initialiseLinkReplacer;
exports.handle = handle;