var nodemailer = require('nodemailer');

//konstruktor klasy 
function Mailer(m_iService, m_iEMailAdd, m_iEMailPass){
    //zalozenie zmiennych obiektu
    this.service = m_iService;
    this.emailAdd = m_iEMailAdd;
    this.emailPass = m_iEMailPass;

    //przygotowanie obiektu transportera
    this.transporter = nodemailer.createTransport({
      host: "smtp.wp.pl",
      port: 465,
      secure: true, // upgrade later with STARTTLS

      auth: {
           user: this.emailAdd, //'youremail@gmail.com',
           pass: this.emailPass , //'yourpassword'
      }
    });
}

//funkcja wysylajaca maila. blad 1 = ktorys z argumentow jest napisem pustym, 
//2 = blad algorytmu
Mailer.prototype.send = function(m_iSubject, m_iToSend, m_iDstAdd) {
   
    if(m_iSubject == "" || m_iToSend == "" || m_iDstAdd =="")
      return 1;

    //przygtowanie maila do wyslania 
    var mailOptions = {
      from: this.emailAdd, //'youremail@gmail.com',
      to: m_iDstAdd, //'myfriend@yahoo.com',
      subject: m_iSubject, //'Sending Email using Node.js',
      text: m_iToSend + "\n\nPozdrowienia\nZespół Powtran-Polska", 
    };


    //wyslanie maila
    this.transporter.sendMail(mailOptions, function(error, info){
       if (error) {
          console.log(error);
          return 2;
       } 
       else{
          console.log('Email sent: ' + info.response);
       }
    });

    return 0;
};

//umozliwienie udostepnienia obiektu za pomoca require(..);
module.exports = Mailer;
