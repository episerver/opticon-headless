async function initBoltCheckout() {
    try {
        const key = document.getElementById("key").value;
        const isAuthenticated = document.getElementById("isAuthenticated").value === "true";
        const email = document.getElementById("email").value;
        const apiUrl = document.getElementById("apiUrl").value;
        const boltEmbedded = Bolt(key);

        if (isAuthenticated) {
            const loginStatusComponent = boltEmbedded.create("login_status");
            await loginStatusComponent.mount("#login-status");
            var response = await fetch("https://" + apiUrl + "/v1/account/exists?email=" + encodeURIComponent(email))
            if (response) {
                var responseAsJson = await response.json();
                if (responseAsJson) {
                    if (!responseAsJson.has_bolt_account) {
                        const authorizationComponent = boltEmbedded.create("authorization_component", { style: { position: "center" } });
                        await authorizationComponent.mount("#boltAccount");
                        let authResponse = await authorizationComponent.authorize({ "email": email });
                        if (authResponse) {
                            let account = await fetch(window.location + 'GetBoltCards?code=' + authResponse.authorizationCode + '&scope=' + authResponse.scope);
                            let data = await account.json();
                            if (data) {
                                if (data?.payment_methods?.length > 0) {
                                    loadPaymentMethods(data);
                                }
                                else {
                                    document.getElementById("boltCards").style.display = "none";
                                    loadPaymentFields(boltEmbedded, data);
                                }
                            }
                        }
                        else {
                            document.getElementById('submit-btn').style.display = 'none';
                        }
                        return;
                    }
                    else {
                        loadPaymentFields(boltEmbedded);
                    }
                }
            }
        }
        else {
            loadPaymentFields(boltEmbedded);
        }
    }
    catch (error) {
        console.log("these are errors", error)
    }
}

function loadPaymentFields(boltEmbedded, account) {
    if (account) {
        document.getElementById("Token").value = account.token;
    }
    document.getElementById("boltCards").style.display = "none";
    var paymentComponent = boltEmbedded.create("payment_component");
    paymentComponent.mount("#boltPayment");

    const accountCheckboxComponent = boltEmbedded.create("account_checkbox");
    accountCheckboxComponent.mount("#boltCheckbox");

    const btn = document.getElementById('submit-btn');
    btn.addEventListener("click", async (e) => {
        let paymentMethod = document.querySelector('input[name="SystemName"]:checked').value;
        if (paymentMethod !== 'Bolt') {
            return;
        }

        e.preventDefault();
        var $form = $('.jsCheckoutForm');
        if ($("#BillingAddress_AddressId").val() == "") {
            document.getElementById('billingAddressContainer').scrollIntoView()
            $("#BillingAddressValidationMessage").html("Required");
            return;
        }

        var url = $form.attr('action');
        const tokenize = await paymentComponent.tokenize();
        if (tokenize) {
            document.getElementById("additionalPaymentData[0].Key").value = "token";
            document.getElementById("additionalPaymentData[0].Value").value = JSON.stringify(tokenize);
            document.getElementById("additionalPaymentData[1].Key").value = "createAccount";
            document.getElementById("additionalPaymentData[1].Value").value = document.getElementById('bolt-acct-check').checked ? "true" : "false";
            var data = $form.serialize();
            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                data: data,
                success: function (result) {
                    if (result.includes('/')) {
                        window.location = result;
                    }
                    else {
                        let error = document.getElementById('boltError');
                        error.innerHTML = result;
                        error.style.display = 'block';
                    }
                }
            });
        }
    });
}

function loadPaymentMethods(account) {
    document.getElementById("boltCards").style.display = "block";
    document.getElementById("Token").value = account.token;
    var select = document.getElementById("selectCard");
    account.payment_methods.forEach((method) => {
        var option = document.createElement("option");
        option.text = method.network + ' - ' + method.last4;
        option.value = method.id;
        select.options.add(option);

    });
    const btn = document.getElementById('submit-btn');
    btn.addEventListener("click", async (e) => {
        let paymentMethod = document.querySelector('input[name="SystemName"]:checked').value;
        if (paymentMethod !== 'Bolt') {
            return;
        }

        e.preventDefault();
        var $form = $('.jsCheckoutForm');

        if ($("#BillingAddress_AddressId").val() == "") {
            document.getElementById('billingAddressContainer').scrollIntoView()
            $("#BillingAddressValidationMessage").html("Required");
            return;
        }

        var url = $form.attr('action');
        if (select && select.value !== '0') {
            document.getElementById("additionalPaymentData[0].Key").value = "card";
            document.getElementById("additionalPaymentData[0].Value").value = select.value;
            document.getElementById("additionalPaymentData[1].Key").value = "dummy";
            document.getElementById("additionalPaymentData[1].Value").value = "dummy";
            var data = $form.serialize();
            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                data: data,
                success: function (result) {
                    if (result.includes('/')) {
                        window.location = result;
                    }
                    else {
                        let error = document.getElementById('boltError');
                        error.innerHTML = result;
                        error.style.display = 'block';
                    }
                }
            });
            
        }
    });
}

initBoltCheckout();