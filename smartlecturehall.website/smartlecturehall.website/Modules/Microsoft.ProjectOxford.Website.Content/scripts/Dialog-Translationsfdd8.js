/**
 * angular-dialog-service - A service to handle common dialog types in a web application.  Built on top of Angular-Bootstrap's modal
 * @version v5.3.0
 * @author Michael Conroy, michael.e.conroy@gmail.com
 * @license MIT, http://www.opensource.org/licenses/MIT
 */
/**
 * Dialog Default Translations.
 *
 * Include this module if you're not already using angular-translate in your application, and
 * add it to your application module's dependency list in order to get default header and
 * dialog messages to appear.
 *
 * Ex: var myApp = angular.module('myApplication',['dialogs.main','dialogs.default-translations']);
 *
 * It was necessary to separate this out for those already using angular-translate because this would
 * automatically reset their translation list for 'en-US'
 *
 * For those already using angular-translate, just copy the list of DIALOG_[..] translations to your
 * translation list where you set 'en-US' using the $translateProvider.
 */

//== Translations =============================================================//

angular.module('dialogs.default-translations', ['pascalprecht.translate'])
/**
    * Default translations in English.
    *
    * Use angular-translate's $translateProvider to provide translations in an
    * alternate language.
    *
    * $translateProvider.translations('[lang]',{[translations]});
    * To use alternate translations set the preferred language to your desired
    * language.
    * $translateProvider.preferredLanguage('[lang]');
    */
   .config(['$translateProvider', function ($translateProvider) {
       $translateProvider.translations('de-DE', {
           DIALOGS_ERROR: "Error",
           DIALOGS_ERROR_MSG: "Ein unbekannter Fehler ist aufgetreten.",
           DIALOGS_CLOSE: "Schließen",
           DIALOGS_PLEASE_WAIT: "Bitte warten",
           DIALOGS_PLEASE_WAIT_ELIPS: "Bitte warten...",
           DIALOGS_PLEASE_WAIT_MSG: "Warte auf Fertigstellung der Operation.",
           DIALOGS_PERCENT_COMPLETE: "% fertig",
           DIALOGS_NOTIFICATION: "Benachrichtigung",
           DIALOGS_NOTIFICATION_MSG: "Unbekannte Anwendungsbenachrichtigung.",
           DIALOGS_CONFIRMATION: "Bestätigung",
           DIALOGS_CONFIRMATION_MSG: "Bestätigung erforderlich.",
           DIALOGS_OK: "OK",
           DIALOGS_YES: "Ja",
           DIALOGS_NO: "Nein"
       });

       $translateProvider.translations('en-US', {
           DIALOG_SALES_HEADER: "Contact sales",
           DIALOG_SALES_THANKYOU: "Thanks for your submission. We'll get back to you.",
           DIALOG_SALES_INTRO: "We’re looking forward to connecting with you. To get started, please provide the information below to the best of your ability, and we’ll get back to you soon!",
           DIALOG_SALES_FIRST: "First, tell us about yourself.",
           DIALOG_SALES_NAME: "Your name",
           DIALOG_SALES_COMPNAME: "Company name",
           DIALOG_SALES_COUNTRY: "Country",
           DIALOG_SALES_EMAIL: "Email",
           DIALOG_SALES_SECOND: "Tell us about your idea.",
           DIALOG_SALES_APP: "Your app and scenario",
           DIALOG_SALES_API: "API(s) you're interested in",
           DIALOG_SALES_CHECK: "Check if you already signed up for free subscription.",
           DIALOG_SALES_SUBSCRIPTIONEMAIL: "What was the email used to register?",
           DIALOG_SALES_MONTHLYCALLS: "Expected monthly calls for each API",
           DIALOG_SALES_SIMULCALLS: "Maximum simultaneous calls per second for each API",
           DIALOG_SALES_ADDITIONALINFO: "Additional info",

           DIALOGS_ERROR: "Error",
           DIALOGS_ERROR_MSG: "An unknown error has occurred.",
           DIALOGS_CLOSE: "Close",
           DIALOGS_PLEASE_WAIT: "Please Wait",
           DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
           DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
           DIALOGS_PERCENT_COMPLETE: "% Complete",
           DIALOGS_NOTIFICATION: "Notification",
           DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
           DIALOGS_CONFIRMATION: "Confirmation",
           DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
           DIALOGS_OK: "OK",
           DIALOGS_YES: "Yes",
           DIALOGS_NO: "No",
           DIALOGS_SUBMIT: "Submit",
           DIALOGS_CANCEL: "Cancel"
       });

       $translateProvider.translations('es-ES', {
           DIALOGS_ERROR: "Error",
           DIALOGS_ERROR_MSG: "Se ha producido un error.",
           DIALOGS_CLOSE: "Cerrar",
           DIALOGS_PLEASE_WAIT: "Espere por favor",
           DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
           DIALOGS_PLEASE_WAIT_MSG: "Completando operación.",
           DIALOGS_PERCENT_COMPLETE: "% Completado",
           DIALOGS_NOTIFICATION: "Notificación",
           DIALOGS_NOTIFICATION_MSG: "Notificación de una aplicación desconocida.",
           DIALOGS_CONFIRMATION: "Confirmación",
           DIALOGS_CONFIRMATION_MSG: "Se requiere confirmacion.",
           DIALOGS_OK: "Aceptar",
           DIALOGS_YES: "Sí",
           DIALOGS_NO: "No"
       });

       $translateProvider.translations("fr-FR", {
           DIALOGS_ERROR: "Erreur",
           DIALOGS_ERROR_MSG: "Une erreur inconnue s'est produite.",
           DIALOGS_CLOSE: "Fermer",
           DIALOGS_PLEASE_WAIT: "Patientez svp",
           DIALOGS_PLEASE_WAIT_ELIPS: "Patienter svp...",
           DIALOGS_PLEASE_WAIT_MSG: "En attente de la fin de l'opération.",
           DIALOGS_PERCENT_COMPLETE: "% Terminer",
           DIALOGS_NOTIFICATION: "Notification",
           DIALOGS_NOTIFICATION_MSG: "Notification de l'application inconnue",
           DIALOGS_CONFIRMATION: "Confirmer",
           DIALOGS_CONFIRMATION_MSG: "Merci de confirmer",
           DIALOGS_OK: "OK",
           DIALOGS_YES: "Oui",
           DIALOGS_NO: "Non"
       });

       $translateProvider.translations('pt-BR', {
           DIALOGS_ERROR: "Erro",
           DIALOGS_ERROR_MSG: "Ocorreu um erro inesperado.",
           DIALOGS_CLOSE: "Fechar",
           DIALOGS_PLEASE_WAIT: "Por favor aguarde",
           DIALOGS_PLEASE_WAIT_ELIPS: "Por favor aguarde...",
           DIALOGS_PLEASE_WAIT_MSG: "Aguardando que a operação termine.",
           DIALOGS_PERCENT_COMPLETE: "% Completados",
           DIALOGS_NOTIFICATION: "Notificação",
           DIALOGS_NOTIFICATION_MSG: "Notificação de aplicação desconhecida.",
           DIALOGS_CONFIRMATION: "Confirmação",
           DIALOGS_CONFIRMATION_MSG: "Confirmação requerida.",
           DIALOGS_OK: "OK",
           DIALOGS_YES: "Sim",
           DIALOGS_NO: "Não"
       });

       $translateProvider.translations('zh-CN', {
           DIALOG_SALES_HEADER: "联系销售",
           DIALOG_SALES_THANKYOU: "感谢你与我们联系。我们会尽快给你答复。",
           DIALOG_SALES_INTRO: "我们期待与你的交流。请你尽量提供以下信息。我们会尽快给你回复。",
           DIALOG_SALES_FIRST: "首先，请告诉我们你的个人信息",
           DIALOG_SALES_NAME: "姓名",
           DIALOG_SALES_COMPNAME: "公司",
           DIALOG_SALES_COUNTRY: "国家",
           DIALOG_SALES_EMAIL: "电子邮箱",
           DIALOG_SALES_SECOND: "请告诉我们你的想法",
           DIALOG_SALES_APP: "你的应用和场景",
           DIALOG_SALES_API: "你感兴趣的API",
           DIALOG_SALES_CHECK: "如果你已经注册免费试用，请打勾",
           DIALOG_SALES_SUBSCRIPTIONEMAIL: "请提供你用于免费注册的邮箱: ",
           DIALOG_SALES_MONTHLYCALLS: "对于每个API，请给出你预期的每月最高请求次数",
           DIALOG_SALES_SIMULCALLS: "对于每个API，请给出每秒最大并发请求数",
           DIALOG_SALES_ADDITIONALINFO: "其它信息",

           DIALOGS_ERROR: "错误",
           DIALOGS_ERROR_MSG: "出现未知错误。",
           DIALOGS_CLOSE: "关闭",
           DIALOGS_PLEASE_WAIT: "请稍候",
           DIALOGS_PLEASE_WAIT_ELIPS: "请稍候...",
           DIALOGS_PLEASE_WAIT_MSG: "请等待操作完成。",
           DIALOGS_PERCENT_COMPLETE: "% 已完成",
           DIALOGS_NOTIFICATION: "通知",
           DIALOGS_NOTIFICATION_MSG: "未知应用程序的通知。",
           DIALOGS_CONFIRMATION: "确认",
           DIALOGS_CONFIRMATION_MSG: "确认要求。",
           DIALOGS_OK: "确定",
           DIALOGS_YES: "确认",
           DIALOGS_NO: "取消",
           DIALOGS_SUBMIT: "确认",
           DIALOGS_CANCEL: "取消"
       });

       $translateProvider.preferredLanguage('en-US');
   }]); // end config
