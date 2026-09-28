import type { AboutProps } from "../../lib/data";

// NOTE: resolveTeamPhotos lives in ./team-photos.ts (imported directly by
// callers). Keeping it out of this file lets the static-site transformer
// hardcode getAboutProps and strip this file's DB imports without breaking the
// runtime team-photo helper.

export const getAboutProps = (_accountIdArg?: bigint): AboutProps | null => {
  return {
  "image": "/placeholder-about.jpg",
  "title": "Sobre Inmobiliaria Sol",
  "content": "En Sol, creemos que la decision de comprar una vivienda es fundamental. Es por esto por lo que queremos acompañarte en tu experiencia de la mano.",
  "showKPI": false,
  "content2": "Nuestro equipo de profesionales te ayudará paso a paso",
  "kpi1Data": "+35",
  "kpi1Name": "Años de experiencia",
  "kpi2Data": "500+",
  "kpi2Name": "Hogares encontrados",
  "kpi3Data": "80+",
  "kpi3Name": "Clientes Satisfechos",
  "kpi4Data": "",
  "kpi4Name": "",
  "services": [{
  "icon": "briefcase",
  "title": "Asesoramiento personalizado"
}, {
  "icon": "calculator",
  "title": "Valoración de inmuebles"
}, {
  "icon": "shield",
  "title": "Servicio de calidad"
}, {
  "icon": "handshake",
  "title": "Asesoramiento de Hipotecas "
}],
  "subtitle": "Más de 35 años a tu lado",
  "buttonName": "Ponte en contacto",
  "aboutSectionTitle": "Nuestra visión",
  "maxServicesDisplayed": 6,
  "servicesSectionTitle": "Servicios ofrecidos"
};
}
