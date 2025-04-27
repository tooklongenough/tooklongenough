export default function Location() {
    return (
      <main>
        <h2>Location</h2>
        <p>Join us at the beautiful St. Norbert Arts Centre!</p>
        <img src="/stnorbert1.jpg" alt="St. Norbert Arts Centre" style={{ width: '100%', borderRadius: '8px' }} />
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.465353109394!2d-97.1475317!3d49.7697736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea716f7e43f0b7%3A0x3c9cbbe81a2ee5a0!2sSt%20Norbert%20Arts%20Centre!5e0!3m2!1sen!2sca!4v1714048889658!5m2!1sen!2sca" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        <p>Address: 100 rue des Ruines du Monastère, Winnipeg, MB</p>
        <p>Directions: Head south on Pembina Hwy, turn onto rue des Ruines du Monastère.</p>
      </main>
    )
  }
  