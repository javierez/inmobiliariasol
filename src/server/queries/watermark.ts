

export interface WatermarkConfig {
  enabled: boolean;
  position: string;
  sizePercentage: number;
  opacity: number;
  logoUrl: string;
}

export const getWatermarkConfig = (): WatermarkConfig => {
  return {
  "enabled": true,
  "position": "center",
  "sizePercentage": 40,
  "opacity": 0.4,
  "logoUrl": "https://inmobiliariaacropolis.s3.us-east-1.amazonaws.com/accounts/103/branding/logo_transparent_1779814371292_JMvGWT.png"
};
}