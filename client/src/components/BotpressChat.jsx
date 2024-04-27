import React, { useEffect } from 'react';

function BotpressChat() {
  useEffect(() => {
    let script1, script2, link;

    const appendScriptsAndStyles = () => {
      // Create and append the Botpress Webchat script tag
      script1 = document.createElement('script');
      script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      script1.async = true;
      document.body.appendChild(script1);

      // Create and append the Botpress Webchat config script tag
      script2 = document.createElement('script');
      script2.src = 'https://mediafiles.botpress.cloud/95295aeb-2819-46e1-88e4-021532f0f1a2/webchat/config.js';
      script2.defer = true;
      document.body.appendChild(script2);

      // Create and append the link tag for the CSS stylesheet
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://webchat-styler-css.botpress.app/prod/ee539de5-5b74-4860-8e50-e1c2bd766a39/v53747/style.css';
      document.head.appendChild(link);
    };

    const removeScriptsAndStyles = () => {
      if (script1 && script2 && link) {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
        document.head.removeChild(link);
      }
    };

    appendScriptsAndStyles();

    return () => {
      removeScriptsAndStyles();
    };
  }, []);

  return <div></div>;
}

export default BotpressChat;
