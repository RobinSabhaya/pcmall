// const dotenv = require('dotenv');
// const path = require('path');
// const Joi = require('joi');

// dotenv.config({ path: path.join(__dirname, '../../.env') });

// const envVarsSchema = Joi.object()
//     .keys({
//         PORT: Joi.number().default(3000),
//         NODE_ENV: Joi.string().default('local'),
//         MONGODB_URL: Joi.string().required().description('Mongo DB url'),
//         JWT_SECRET: Joi.string().required().description('JWT secret key'),
//         ENCRYPT_SECRET_KEY: Joi.string().required().description('Crypto secret key'),
//         JWT_ACCESS_EXPIRATION_YEARS: Joi.number()
//             .default(30)
//             .description('minutes after which access tokens expire'),
//         JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
//             .default(30)
//             .description('days after which refresh tokens expire'),
//         OTP_EXPIRATION_MINUTES: Joi.number()
//             .default(10)
//             .description('minutes after which otp expires'),
//         RESET_PASS_EXPIRATION_MINUTES: Joi.number()
//             .default(10)
//             .description('minutes after which reset password token expires'),
//         SMTP_HOST: Joi.string().description('server that will send the emails'),
//         SMTP_PORT: Joi.number().description('port to connect to the email server'),
//         SMTP_USERNAME: Joi.string().description('username for email server'),
//         SMTP_PASSWORD: Joi.string().description('password for email server'),
//         EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
//         REPLY_TO: Joi.string().description('the from field for the replyTo by the user'),
//         BASE_URL: Joi.string().required().description('Base url'),
//         AWS_ACCESS_KEY: Joi.string().required().description('AWS access key'),
//         AWS_SECRET_KEY: Joi.string().required().description('AWS secret key'),
//         AWS_REGION: Joi.string().required().description('AWS region'),
//         AWS_BUCKET_NAME: Joi.string().required().description('AWS bucket name'),
//         IMAGE_URL: Joi.string().required().description('Image url'),
//         FACEBOOK_LINK: Joi.string().required().description('Facebook link'),
//         INSTAGRAM_LINK: Joi.string().required().description('Instagram link'),
//         LINKEDIN_LINK: Joi.string().required().description('LinkedIn link'),
//         TWITTER_LINK: Joi.string().required().description('Twitter link'),
//         YOUTUBE_LINK: Joi.string().required().description('Youtube link'),
//         FACEBOOK_LOGO: Joi.string().required().description('Facebook logo'),
//         INSTAGRAM_LOGO: Joi.string().required().description('Instagram logo'),
//         TELEGRAM_LOGO: Joi.string().required().description('Telegram logo'),
//         TWITTER_LOGO: Joi.string().required().description('Twitter logo'),
//         WHATSAPP_LOGO: Joi.string().required().description('WhatsApp logo'),
//         TWILIO_ACC_SID: Joi.string().description('Twilio account sid'),
//         TWILIO_AUTH_TOKEN: Joi.string().description('Twilio auth token'),
//         TWILIO_VERIFY_SID: Joi.string().description('Twilio verify sid'),
//         FROM_MOBILE_NO: Joi.string().description('Twilio from mobile number'),
//         MSG91_INTEGRATED_NUMBER: Joi.string().description('MSG91 integrated number'),
//         MSG91_AUTH_KEY: Joi.string().description('MSG91 Auth key'),
//         API_KEY_FOR_YOUTUBE: Joi.string().description('API key for youtube'),
//         MOBICOMM_USER: Joi.string().description('MobiComm user name'),
//         MOBICOMM_KEY: Joi.string().description('MobiComm key'),
//         REDIS_HOST: Joi.string().description('Redis Host'),
//         REDIS_PORT: Joi.string().description('Redis Port'),
//         REDIS_PASSWORD: Joi.string().description('Redis password').optional(),
//         AI_SENSY_API_KEY: Joi.string().description('AiSensy API key'),
//         AI_SENSY_USERNAME: Joi.string().description('AiSensy username'),
//         EMAIL_FUNCTION_NAME: Joi.string()
//             .description('Email function name to manage server!')
//             .optional()
//             .allow('')
//             .default('sendEmail'),
//     })
//     .unknown();

// const { value: envVars, error } = envVarsSchema
//     .prefs({ errors: { label: 'key' } })
//     .validate(process.env);

// if (error) {
//     throw new Error(`Config validation error: ${error.message}`);
// }

// module.exports = {
//     port: envVars.PORT,
//     node_env: envVars.NODE_ENV,
//     mongoose: {
//         url: envVars.MONGODB_URL,
//         options: {
//             // useCreateIndex: true,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         },
//     },
//     jwt: {
//         secret: envVars.JWT_SECRET,
//         accessExpirationYear: envVars.JWT_ACCESS_EXPIRATION_YEARS,
//         refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
//         otpExpirationMinutes: envVars.OTP_EXPIRATION_MINUTES,
//         resetPassExpirationMinutes: envVars.RESET_PASS_EXPIRATION_MINUTES,
//     },
//     crypto: {
//         secret: envVars.ENCRYPT_SECRET_KEY,
//         petParentSecret: envVars.PET_PARENT_MOBILE_SECRET_KEY,
//     },
//     email: {
//         smtp: {
//             host: envVars.SMTP_HOST,
//             port: envVars.SMTP_PORT,
//             auth: {
//                 user: envVars.SMTP_USERNAME,
//                 pass: envVars.SMTP_PASSWORD,
//             },
//             tls: {
//                 // do not fail on invalid certs
//                 rejectUnauthorized: false,
//             },
//         },
//         from: envVars.EMAIL_FROM,
//         reply_to: envVars.REPLY_TO,
//     },
//     aws: {
//         access_key: envVars.AWS_ACCESS_KEY,
//         secret_key: envVars.AWS_SECRET_KEY,
//         region: envVars.AWS_REGION,
//         bucket_name: envVars.AWS_BUCKET_NAME,
//     },
//     base_url: envVars.BASE_URL,
//     image_url: envVars.IMAGE_URL,
//     front_url: envVars.FRONT_URL,
//     admin_url: envVars.ADMIN_URL,
//     social_icons: {
//         facebook: envVars.FACEBOOK_LOGO,
//         instagram: envVars.INSTAGRAM_LOGO,
//         telegram: envVars.TELEGRAM_LOGO,
//         twitter: envVars.TWITTER_LOGO,
//         whatsapp: envVars.WHATSAPP_LOGO,
//     },
//     social_links: {
//         facebook: envVars.FACEBOOK_LINK,
//         instagram: envVars.INSTAGRAM_LINK,
//         linkedin: envVars.LINKEDIN_LINK,
//         youtube: envVars.YOUTUBE_LINK,
//         twitter: envVars.TWITTER_LINK,
//     },
//     twilio: {
//         account_sid: envVars.TWILIO_ACC_SID,
//         auth_token: envVars.TWILIO_AUTH_TOKEN,
//         verify_sid: envVars.TWILIO_VERIFY_SID,
//         from: {
//             mobile_no: envVars.FROM_MOBILE_NO,
//         },
//     },
//     msg91: {
//         auth_key: envVars.MSG91_AUTH_KEY,
//         integrated_number: envVars.MSG91_INTEGRATED_NUMBER,
//     },
//     google: {
//         youtube: {
//             api_key: envVars.API_KEY_FOR_YOUTUBE,
//         },
//     },
//     mobicomm: {
//         user: envVars.MOBICOMM_USER,
//         key: envVars.MOBICOMM_KEY,
//     },
//     redis: {
//         host: envVars.REDIS_HOST,
//         port: envVars.REDIS_PORT,
//         password: envVars.REDIS_PASSWORD,
//     },
//     ai_sensy: {
//         api_key: envVars.AI_SENSY_API_KEY,
//         username: envVars.AI_SENSY_USERNAME,
//     },
//     send_grid: {
//         api_key: envVars.SEND_GRID_API_KEY,
//         sender_email: envVars.SEND_GRID_SENDER_EMAIL,
//     },
//     email_function_name: envVars.EMAIL_FUNCTION_NAME,
// };
