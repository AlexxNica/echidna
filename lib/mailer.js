'use strict';

const nodemailer = require('nodemailer');
const sendmail = require('nodemailer-sendmail-transport');

// X const meta = require('../package');
const Orchestrator = require('./orchestrator');

const transporter = nodemailer.createTransport(sendmail());

/* X const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail'
}); */

const composeSubject = (success, state, url) => {
  var result = '[W3C Publication]';

  if (success)
    result += `Success: ${state.get('metadata').get('thisVersion')}`;
  else
    result += `Failed: ${url}`;

  return result;
};

const composeTextBody = (success) => {
  var result = '';

  if (success)
    result += '';
  else
    result += '';

  return result;
};

const composeHTMLBody = (success) => {
  var result = '';

  if (success)
    result += '';
  else
    result += '';

  return result;
};

/**
 * Send e-mail notification about a publication job.
 *
 * @param id - job ID.
 * @param state - orchestrator state.
 * @param json - JSON data about the request.
 * @param url - URL (or TAR filename) that was to be published.
 */

const sendMessage = (id, state, json, url) => {
  const success = (Orchestrator.STATUS_SUCCESS === state.get('status'));
  const message = {
    from: global.MAIL_SENDER,
    to: global.MAILING_LIST,
    subject: composeSubject(success, state, url),
    text: composeTextBody(success),
    html: composeHTMLBody(success),
    attachments: [
      {
        filename: `${id}.json`,
        content: json
      }
    ]
  };

  transporter.sendMail(message, (error, info) => {
    if (error)
      return console.log(error);
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

module.exports.sendMessage = sendMessage;
