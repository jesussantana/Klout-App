const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

const greetings = (name, surname, email) => {
  return contentHTML = 
  `<body style="margin:0; font-family: 'Roboto', sans-serif;">
  <div
      style="background: url('https://res.cloudinary.com/agustems/image/upload/v1599832497/roomer/bg_copia_adskhe.png'); height: 150px; background-size: cover;
background-repeat: no-repeat; text-align: center; margin: 0;">
      <img alt="roomer-logo" src="https://res.cloudinary.com/agustems/image/upload/v1599832441/roomer/Logoroomer-white_pzpwsv.png" style="height:130px; margin-top: 5px;"/>
  </div>
    <div>
      <h1 style="padding: 1% 15%; text-align: center; font-size: 1.5em;">Welcome to the roomer family, ${name} ${surname}!</h1>
      <h6 style="margin:0 0 2% 0; padding: 0 5%; text-align: center; font-size: 0.7em; font-weight: 300;">Thank you for trusting us with your roommate search!</h6>
      <img alt="interest-anouncer" src="https://res.cloudinary.com/agustems/image/upload/v1599845979/roomer/welcome_zttcer.png" style="width:100%;"/>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Here are your credentials!</h3>
      <ul style="font-weight: 300; font-size: 0.8em">
        <li><b>Name:</b> ${name}</li>
        <li><b>Surname:</b> ${surname}</li>
        <li><b>Contact email:</b> ${email}</li>
      </ul>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Next steps! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">
        Now, you can browse freely for our rooms list, save the ones that caught your eye in your favourites list, 
        and post or make an offer for a room and meet your perfect roommate!
      </p>
      <p style="font-weight: 300;  font-size: 0.8em">
        Please, if you didn't fully fill the sign in form (yeah, we know, it's quite boring doing so), go to your user profile and 
        update your data an upload a cool picture of you so that people can get to know you!
      </p>
    </div>
    <div style="background: url(https://res.cloudinary.com/agustems/image/upload/v1599834855/roomer/pexels-skitterphoto-584399_hkhwyp.jpg); 
    background-repeat: no-repeat; background-size: cover;  height: 100px;">
      <h3 style="color: white; text-shadow: 5px 5px 5px gray; text-align: center; padding-top:20px;"> Thank you for using roomer!</h3>
      <p style="color: white; font-weight: 300; font-size: 0.8em; text-align: center;">Go to 
        <a style="color:white; font-weight: 500;" href="http://roomer-app.herokuapp.com/">roomer</a> to find your perfect roommate!</p>
    </div>
  </body>`
}

const goodbye = (user) => {
  return contentHTML = 
  `<body style="margin:0; font-family: 'Roboto', sans-serif; min-height: 100vh">
  <div
      style="background: url('https://res.cloudinary.com/agustems/image/upload/v1599832497/roomer/bg_copia_adskhe.png'); height: 150px; background-size: cover;
background-repeat: no-repeat; text-align: center; margin: 0;">
      <img alt="roomer-logo" src="https://res.cloudinary.com/agustems/image/upload/v1599832441/roomer/Logoroomer-white_pzpwsv.png" style="height:130px; margin-top: 5px;"/>
  </div>
    <div>
      <h1 style="padding: 1% 15%; text-align: center; font-size: 1.5em;">We are sad to see you go, ${user.name} ${user.surname}</h1>
      <h6 style="margin:0 0 2% 0; padding: 0 5%; text-align: center; font-size: 0.7em; font-weight: 300;">We hope you all the best, we'll be here in case you need us!</h6>
      <img alt="interest-anouncer" src="https://res.cloudinary.com/agustems/image/upload/v1599845985/roomer/goodbye_duhn2y.png" style="width:100%;"/>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Goodbye, roomer! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">
        You deleted your account in our page, roomer. We are sad to see you go. Please, let us know if you didn't find what you were looking for in our platform
        so that we can improve it and become a better app!
      </p>
      <p style="font-weight: 300;  font-size: 0.8em">
        All your information will be eliminated from our database, as well as all your adverts to ensure your privacy. If you need us again, we'll be thrilled to help
        you find your perfect roomate!
      </p>
    </div>
    <div style="background: url(https://res.cloudinary.com/agustems/image/upload/v1599834855/roomer/pexels-skitterphoto-584399_hkhwyp.jpg); 
    background-repeat: no-repeat; background-size: cover;  height: 100px; width: 100%">
      <h3 style="color: white; text-shadow: 5px 5px 5px gray; text-align: center; padding-top:20px;"> Thank you for using roomer!</h3>
      <p style="color: white; font-weight: 300; font-size: 0.8em; text-align: center;">Go to 
        <a style="color:white; font-weight: 500;" href="http://roomer-app.herokuapp.com/">roomer</a> to find your perfect roommate!</p>
    </div>
  </body>`
}

const offerSend = (user, room, message) => {
  return contentHTML = 
  `<body style="margin:0; font-family: 'Roboto', sans-serif;">
  <div
      style="background: url('https://res.cloudinary.com/agustems/image/upload/v1599832497/roomer/bg_copia_adskhe.png'); height: 150px; background-size: cover;
background-repeat: no-repeat; text-align: center; margin: 0;">
      <img alt="roomer-logo" src="https://res.cloudinary.com/agustems/image/upload/v1599832441/roomer/Logoroomer-white_pzpwsv.png" style="height:130px; margin-top: 5px;"/>
  </div>
    <div>
      <h1 style="padding: 1% 15%; text-align: center; font-size: 1.5em;">Someone is interested in your room!</h1>
      <h6 style="margin:0 0 2% 0; padding: 0 5%; text-align: center; font-size: 0.7em; font-weight: 300;">Hello ${room.owner.name}! One of the users of roomer has shown interest in your room advert, <b>${room.title}!</b></h6>
      <img alt="interest-anouncer" src="https://res.cloudinary.com/agustems/image/upload/v1599833118/roomer/email_uexfqu.png" style="width:100%;"/>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Here is ${user.name} ${user.surname}'s message! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">${message}</p>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Here are the details of ${user.name} so that you can contact him! </h3>
      <ul style="font-weight: 300; font-size: 0.8em">
        <li><b>Name:</b> ${user.name}</li>
        <li><b>Surname:</b> ${user.surname}</li>
        <li><b>Contact email:</b> ${user.email}</li>
        <li><b>Advert of interest:</b> ${room.title}</li>
      </ul>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Next steps! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">
        Now, if you are interested in the user offer, we urge you to contact him/her as soon as possible, 
        or you could loose your perfect roommate!
      </p>
      <p style="font-weight: 300;  font-size: 0.8em">
        If you feel that you have found your perfect roommate, please, errase the room from your adverts section 
        in your roomer user profile so that you don't recive more offers for your room.
      </p>
    </div>
    <div style="background: url(https://res.cloudinary.com/agustems/image/upload/v1599834855/roomer/pexels-skitterphoto-584399_hkhwyp.jpg); 
    background-repeat: no-repeat; background-size: cover;  height: 100px;">
      <h3 style="color: white; text-shadow: 5px 5px 5px gray; text-align: center; padding-top:20px;"> Thank you for using roomer!</h3>
      <p style="color: white; font-weight: 300; font-size: 0.8em; text-align: center; text-shadow: 5px 5px 5px gray;">Go to 
        <a style="color:white; font-weight: 500;" href="http://roomer-app.herokuapp.com/">roomer</a> to find your perfect roommate!</p>
    </div>
  </body>`
}

const offerMade = (user, room, message) => {
  return contentHTML = 
  `<body style="margin:0; font-family: 'Roboto', sans-serif;">
  <div
      style="background: url('https://res.cloudinary.com/agustems/image/upload/v1599832497/roomer/bg_copia_adskhe.png'); height: 150px; background-size: cover;
background-repeat: no-repeat; text-align: center; margin: 0;">
      <img alt="roomer-logo" src="https://res.cloudinary.com/agustems/image/upload/v1599832441/roomer/LogoRoomer-white_pzpwsv.png" style="height:130px; margin-top: 5px;"/>
  </div>
    <div>
      <h1 style="padding: 1% 15%; text-align: center; font-size: 1.5em;">You just made an offer for a room!</h1>
      <h6 style="margin:0 0 2% 0; padding: 0 5%; text-align: center; font-size: 0.7em; font-weight: 300;">One of the many rooms in Romer has caught your attencion and you made an offer for <b>${room.title}!</b></h6>
      <img alt="interest-anouncer" src="https://res.cloudinary.com/agustems/image/upload/v1599833118/roomer/email_uexfqu.png" style="width:100%;"/>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Here is the message that you sent to ${room.owner.name} ${room.owner.surname}! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">${message}</p>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Next steps! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">
        You have shown your interest for the room advert, now you just have to wait to hear from the owner! ${user.name}, the advertiser has all the necessary information to contact you as soon as possible 
        and make you know if you are his/her perfect roommate! Now we ask you for a little patience while ${room.owner.name} sees your message.
      </p>
      <p style="font-weight: 300;  font-size: 0.8em">
        If you don't have any news from the advertiser in a week, please contact us so that our team can try to get in touch with him/her.
        If we still don't hear anything from him/her, our support team will take the room out from our room list. 
      </p>
    </div>
    <div style="background: url(https://res.cloudinary.com/agustems/image/upload/v1599834855/roomer/pexels-skitterphoto-584399_hkhwyp.jpg); 
    background-repeat: no-repeat; background-size: cover;  height: 100px;">
      <h3 style="color: white; text-shadow: 5px 5px 5px gray; text-align: center; padding-top:20px;"> Thank you for using Roomer!</h3>
      <p style="color: white; font-weight: 300; font-size: 0.8em; text-align: center; text-shadow: 5px 5px 5px gray;">Go to 
        <a style="color:white; font-weight: 500;" href="http://roomer-app.herokuapp.com/">Roomer</a> to find your perfect roommate!</p>
    </div>
  </body>`
}

const offerDelete = (room) => {
  return contentHTLM = 
  `<body style="margin:0; font-family: 'Roboto', sans-serif; min-height: 100vh">
  <div
      style="background: url('https://res.cloudinary.com/agustems/image/upload/v1599832497/roomer/bg_copia_adskhe.png'); height: 150px; background-size: cover;
        background-repeat: no-repeat; text-align: center; margin: 0;">
      <img alt="roomer-logo" src="https://res.cloudinary.com/agustems/image/upload/v1599832441/roomer/LogoRoomer-white_pzpwsv.png" style="height:130px; margin-top: 5px;"/>
  </div>
    <div>
      <h1 style="padding: 1% 15%; text-align: center; font-size: 1.5em;">You retrieved your offer!</h1>
      <h6 style="margin:0 0 2% 0; padding: 0 5%; text-align: center; font-size: 0.7em; font-weight: 300;">You retrieved the offer done to the advert ${room.title} correctly.</h6>
      <img alt="interest-anouncer" src="https://res.cloudinary.com/agustems/image/upload/v1599856318/roomer/delete_cyzdnb.png" style="width:100%;"/>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Offer retrieved, roomer! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">
        You deleted your offer for the room ${room.title} in our page, Roomer. Please, let us know if there was something wrong with the advert or the advertiser so 
        we can fix it immediately. If you just found something better, best of luck with your new roommate!
      </p>
      <p style="font-weight: 300;  font-size: 0.8em">
        The offer will be retrieved from our database, and the advertiser will be notified that you are no longer interested in the room.
        We hope that you've found the perfect roommate for you!
      </p>
    </div>
    <div style="background: url(https://res.cloudinary.com/agustems/image/upload/v1599834855/roomer/pexels-skitterphoto-584399_hkhwyp.jpg); 
      background-repeat: no-repeat; background-size: cover;  height: 100px; width: 100%">
      <h3 style="color: white; text-shadow: 5px 5px 5px gray; text-align: center; padding-top:20px;"> Thank you for using Roomer!</h3>
      <p style="color: white; font-weight: 300; font-size: 0.8em; text-align: center;">Go to 
        <a style="color:white; font-weight: 500;" href="http://roomer-app.herokuapp.com/">Roomer</a> to find your perfect roommate!</p>
    </div>
  </body>`
}

const offerWarning = (user, room) => {
  return contentHTML = 
  `<body style="margin:0; font-family: 'Roboto', sans-serif; min-height: 100vh">
  <div
      style="background: url('https://res.cloudinary.com/agustems/image/upload/v1599832497/roomer/bg_copia_adskhe.png'); height: 150px; background-size: cover;
        background-repeat: no-repeat; text-align: center; margin: 0;">
      <img alt="roomer-logo" src="https://res.cloudinary.com/agustems/image/upload/v1599832441/roomer/LogoRoomer-white_pzpwsv.png" style="height:130px; margin-top: 5px;"/>
  </div>
    <div>
      <h1 style="padding: 1% 15%; text-align: center; font-size: 1.5em;">An offer for your advert was retrieved!</h1>
      <h6 style="margin:0 0 2% 0; padding: 0 5%; text-align: center; font-size: 0.7em; font-weight: 300;">${user.name} ${user.surname} has retrieved his offer for the advert ${room.title}.</h6>
      <img alt="interest-anouncer" src="https://res.cloudinary.com/agustems/image/upload/v1599856318/roomer/delete_cyzdnb.png" style="width:100%;"/>
    </div>
    <hr style="border: 1px solid #4d716d"/>
    <div style="margin: 0 5%;">
      <h3> Offer retrieved, roomer! </h3>
      <p style="font-weight: 300;  font-size: 0.8em">
        The offer that ${user.name} did for your room ${room.title} was retrieved, Roomer. He/she seems that is not interested in your room anymore, but don't 
        give up! Your perfect roommate will appear soon! Best of luck with your search!
      </p>
      <p style="font-weight: 300;  font-size: 0.8em">
        The offer will be retrieved from our database, and the offer will no longer be available in the offers page.
        We hope that you find the perfect roommate for you soon!
      </p>
    </div>
    <div style="background: url(https://res.cloudinary.com/agustems/image/upload/v1599834855/roomer/pexels-skitterphoto-584399_hkhwyp.jpg); 
      background-repeat: no-repeat; background-size: cover;  height: 100px; width: 100%">
      <h3 style="color: white; text-shadow: 5px 5px 5px gray; text-align: center; padding-top:20px;"> Thank you for using Roomer!</h3>
      <p style="color: white; font-weight: 300; font-size: 0.8em; text-align: center;">Go to 
        <a style="color:white; font-weight: 500;" href="http://roomer-app.herokuapp.com/">Roomer</a> to find your perfect roommate!</p>
    </div>
  </body>`

}

module.exports = {transporter, greetings, goodbye, offerSend, offerMade, offerDelete, offerWarning}