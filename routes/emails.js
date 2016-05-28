/**
 * Created by danielslaby on 28/05/16.
 */
'use strict';
let sendgrid = require('sendgrid')('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');

// API_KEY = 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
/**
 * Send email to requested person
 * @param to:string  Must be valid mail address
 * @param from:string
 * @param subject:string
 * @param text:string
 * @returns {Promise|Promise<T>}
 */
exports.sendMail = (to, from, subject, text)=> {
    return new Promise((resolve, reject)=> {
        sendgrid.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        }, function (err, json) {
            if (err) {
                reject(err);

            }
            resolve(json);
        });
    });
};

exports.sendActivationMail = (to) => {
    exports.sendMail(
        to,
        'no-replay@smetter.pl',
        "Rejestracja konta w serwisie Smetter",
        `
Hej!\n
Dziękujemy za rejestrację w serwisie Smetter. Cieszymy się, że zdecydowałeś/aś się skorzystać z naszego serwisu.\n
Już nigdy organizacja sportowych wydarzeń nie będzie udręką.\n
Jeżeli napotkasz jakiekolwiek błędy lub masz pytania, uwagi to śmiało pisz w komunikatorze. Nasz zespół Customer Service odpowie w jak najkrótszym czasie!\n
Miłego Dnia!\n
Smetter Team
        `
    ).then((json) => {
        console.log("WROCIL", json)
    }).catch((err) => {
        console.log("BLAD", err)
    });
};