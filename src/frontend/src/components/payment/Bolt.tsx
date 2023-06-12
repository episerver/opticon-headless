import React, { useState } from "react";
import { useEffect } from "react";
import { User } from 'oidc-client-ts';
import AuthService from "../../AuthService";
import Config from "../../config.json";

const BoltPayment = () => {
    const [publishableKey, setPublishableKey] = useState<string>("kskuWMk35LCF.Iv1kC3OqKBv3.594e53e605d17aaa87da995a5f21674c1303653f492d662b2ddff3f7f0a8c260");
    const [apiUrl, setApiUrl] = useState<string>("api-sandbox.bolt.com");
    const [jsUrl, setJsUrl] = useState<string>("connect.bolt.com");
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    const checkAuth = () => {
        AuthService.getUser().then((user: User | null) => {
            if (user && !user.expired) {
                setUser(user);
            } 
            setIsReady(true);
        });
    };

    useEffect(() => {
        if(isReady){
            var embedScript = document.createElement('script');
            embedScript.async = true;
            embedScript.src = `https://${jsUrl}/embed.js`;
            embedScript.setAttribute("data-publishable-key", publishableKey);
            embedScript.onload = function () {
                var boltScript = document.createElement('script');
                boltScript.type = "text/javascript";
                boltScript.src = `${Config.BASE_URL}js/bolt.js`;
                boltScript.defer = true;
                document.children[0].appendChild(boltScript);
            };
            document.children[0].appendChild(embedScript);
        }else{
            checkAuth();
        }
    }, [isReady])

    return <>
        <input type="hidden" id="key" value={publishableKey} />
        <input type="hidden" id="isAuthenticated" value={!!user ? "true" : "false"} />
        <input type="hidden" id="email" value={user?.profile?.email ?? ""} />
        <input type="hidden" id="apiUrl" value={apiUrl} />
        <input type="hidden" id="SystemKeyword" value="Bolt" />
        <input type="hidden" id="Token" value="" />
        <input type="hidden" id="additionalPaymentData[0].Key" name="additionalPaymentData[0].Key" value="" />
        <input type="hidden" id="additionalPaymentData[0].Value" name="additionalPaymentData[0].Value" value="" />
        <input type="hidden" id="additionalPaymentData[1].Key" name="additionalPaymentData[1].Key" value="" />
        <input type="hidden" id="additionalPaymentData[1].Value" name="additionalPaymentData[1].Value" value="" />
        <div id="login-status" className="mt-5"></div>
        <div id="boltAccount" className="mt-5"></div>
        <div id="boltPayment" className="mt-5"></div>
        <div id="boltCheckbox" className="mt-5"></div>
        <div id="boltCards">
            <select id="selectCard">
                <option value="0">Choose a Card</option>
            </select>
        </div>
        <div id="boltError" className="invisible mt-5 text-red-500 text-sm"></div>
    </>;
}

export default BoltPayment;