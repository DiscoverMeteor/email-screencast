if (Meteor.isClient) {
  Template.sendEmail.events({
    "click #send-email": function (e, tmpl) {
      Meteor.call("sendEmail", function (err) {
        if (err) console.log(err);
      });
    }
  });
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    process.env.MAIL_URL="smtp://postmaster%40mather.mailgun.org:4hhn2i7bkol2@smtp.mailgun.org:587";
  });

  function sendSampleEmail () {
    Email.send({
      from: "EventedMind <contact@eventedmind.com>",
      to: "mather@eventedmind.com",
      subject: "[evmind] Testing Meteor Email",
      text: "Hello world",
      html: Handlebars.templates.email({name: "Chris"})
    });
  }

  Meteor.methods({
    sendEmail: function () {
      sendSampleEmail();
    }
  });
}
