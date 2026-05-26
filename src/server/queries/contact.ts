

export type ContactProps = {
  title: string;
  subtitle: string;
  messageForm: boolean;
  address: boolean;
  phone: boolean;
  mail: boolean;
  schedule: boolean;
  map: boolean;
  // Optional hero banner for /contacto page. Absent => no hero rendered.
  heroImage?: string;
  heroVideo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  // Contact information fields
  offices: Array<{
    id: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
    phoneNumbers: {
      main: string;
      sales: string;
    };
    emailAddresses: {
      info: string;
      sales: string;
    };
    scheduleInfo: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    mapUrl: string;
    isDefault?: boolean;
  }>;
};

export const getContactProps = (): ContactProps | null => {
  return {
  "map": true,
  "mail": true,
  "phone": true,
  "title": "Contáctanos",
  "address": true,
  "offices": [{
  "id": "OlnINS_CmHQ_Co3xHJmpg",
  "name": "Inmobiliaria Sol León",
  "mapUrl": "https://maps.app.goo.gl/9ronQhh58QpgFezs9",
  "address": {
  "city": "León",
  "state": "León",
  "street": "C. la Rúa, 45",
  "country": "España"
},
  "isDefault": true,
  "phoneNumbers": {
  "main": "987722540",
  "sales": ""
},
  "scheduleInfo": {
  "sunday": "Domingos: Cerrado",
  "saturday": "Sábados: 9:00 - 13:00",
  "weekdays": "Lunes a Viernes: Mañana 9:00 - 14:00  Tarde 17:00 - 20:00"
},
  "emailAddresses": {
  "info": "sol@gmail.es",
  "sales": ""
}
}],
  "schedule": true,
  "subtitle": "",
  "messageForm": true
};
}

