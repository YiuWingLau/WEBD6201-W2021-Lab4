/*
File name: app.js
Name: Yiu Wing Lau
Student ID: 100704716
Date Completed: 16/04/2021
*/
"use strict";
var core;
(function (core) {
    function testFullName() {
        let messageArea = $("#messageArea").hide();
        let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;
        $("#fullName").on("blur", function () {
            if (!fullNamePattern.test($(this).val().toString())) {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function testContactNumber() {
        let messageArea = $("#messageArea");
        let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        $("#contactNumber").on("blur", function () {
            if (!contactNumberPattern.test($(this).val().toString())) {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function testEmailAddress() {
        let messageArea = $("#messageArea");
        let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        $("#emailAddress").on("blur", function () {
            if (!emailAddressPattern.test($(this).val().toString())) {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function formValidation() {
        testFullName();
        testContactNumber();
        testEmailAddress();
    }
    function displayContact() {
        formValidation();
        $("#sendButton").on("click", (event) => {
            let subscribeCheckbox = $("#subscribeCheckbox")[0];
            let fullName = $("#fullName")[0];
            let contactNumber = $("#contactNumber")[0];
            let emailAddress = $("#emailAddress")[0];
            if (subscribeCheckbox.checked) {
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
            location.href = '/contact';
        });
    }
    function displayContactList() {
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = '/contact-list';
            }
        });
    }
    function displayEdit() {
        formValidation();
    }
    function displayLogin() {
    }
    function CheckFirstName() {
        let errorMessage = $("#errorMessage");
        let namePattern = /^[A-Z][a-z]+$/;
        $("#firstName").on("blur", function () {
            if (!namePattern.test($(this).val().toString())) {
                $("#hintText").hide();
                errorMessage
                    .show()
                    .addClass("alert alert-danger")
                    .text("Please enter a valid Name. First name should have at least 2 characters and start with a uppercase letter.");
                $(this).trigger("focus").trigger("select");
            }
            else {
                errorMessage.removeAttr("class").hide();
                $("#hintText").show();
            }
        });
    }
    function CheckLastName() {
        let errorMessage = $("#errorMessage").hide();
        let namePattern = /^[A-Z][a-z]+$/;
        $("#lastName").on("blur", function () {
            let validation = namePattern.test($(this).val().toString());
            if (!validation) {
                $("#hintText").hide();
                errorMessage
                    .show()
                    .addClass("alert alert-danger")
                    .text("Please enter a valid Name. Last name should have at least 2 characters and start with a uppercase letter.");
                $(this).trigger("focus").trigger("select");
            }
            else {
                errorMessage.removeAttr("class").hide();
                $("#hintText").show();
            }
        });
    }
    function CheckEmail() {
        let errorMessage = $("#errorMessage").hide();
        let emailPattern = /^([a-zA-Z0-9._%-]{8,}@[a-zA-Z0-9-]{4,}\.[a-zA-Z]{2,6})*$/;
        $("#emailAddress").on("blur", function () {
            let validation = emailPattern.test($(this).val().toString());
            if (!validation) {
                $("#hintText").hide();
                errorMessage
                    .show()
                    .addClass("alert alert-danger")
                    .text("Please enter a valid Email Address.");
                $(this).trigger("focus").trigger("select");
            }
            else {
                errorMessage.removeAttr("class").hide();
                $("#hintText").show();
            }
        });
    }
    function CheckUsername() {
        let errorMessage = $("#errorMessage").hide();
        let namePattern = /^([a-zA-Z][a-zA-Z0-9]{4,})+$/;
        $("#username").on("blur", function () {
            let validation = namePattern.test($(this).val().toString());
            if (!validation) {
                $("#hintText").hide();
                errorMessage
                    .show()
                    .addClass("alert alert-danger")
                    .text("Please enter a valid Name. User name should have at least 5 letters or number which starting with letter.");
                $(this).trigger("focus").trigger("select");
            }
            else {
                errorMessage.removeAttr("class").hide();
                $("#hintText").show();
            }
        });
    }
    function CheckPassword() {
        let errorMessage = $("#errorMessage").hide();
        let passwordPattern = /^([a-zA-Z0-9._%-]{6,})*$/;
        $("#password").on("blur", function () {
            let validation = passwordPattern.test($(this).val().toString());
            if (!validation || $(this).val() == "") {
                $("#hintText").hide();
                errorMessage
                    .show()
                    .addClass("alert alert-danger")
                    .text("Please enter a valid password. It should have at least 6 characters.");
                $(this).trigger("focus").trigger("select");
            }
            else {
                errorMessage.removeAttr("class").hide();
                $("#hintText").show();
            }
        });
    }
    function CheckConfirmPassword() {
        let errorMessage = $("#errorMessage").hide();
        let passwordPattern = /^([a-zA-Z0-9._%-]{6,})*$/;
        $("#confirmPassword").on("blur", function () {
            let validation = passwordPattern.test($(this).val().toString());
            if (!validation || $(this).val() == "") {
                $("#hintText").hide();
                errorMessage
                    .show()
                    .addClass("alert alert-danger")
                    .text("Please enter a confirm password. It should have at least 6 characters.");
                $(this).trigger("focus").trigger("select");
            }
            else {
                if ($("#password").val() !== $(this).val()) {
                    $("#hintText").hide();
                    errorMessage
                        .show()
                        .addClass("alert alert-danger")
                        .text("Password didn't match. Please enter again.");
                    $(this).val('');
                    $("#password").val('');
                    $("#password").trigger("focus").trigger("select");
                }
                else {
                    errorMessage.removeAttr("class").hide();
                    $("#hintText").show();
                }
            }
        });
    }
    function RegisterValidation() {
        CheckFirstName();
        CheckLastName();
        CheckEmail();
        CheckUsername();
        CheckPassword();
        CheckConfirmPassword();
    }
    function displayRegister() {
        RegisterValidation();
    }
    function Start() {
        let pageID = $("body")[0].getAttribute("id");
        switch (pageID) {
            case 'edit':
                displayEdit();
                break;
            case 'contact':
                displayContact();
                break;
            case 'auth/login':
                displayLogin();
                break;
            case 'auth/register':
                displayRegister();
                break;
            case 'contact-list':
                displayContactList();
                break;
        }
    }
    window.addEventListener("load", Start);
})(core || (core = {}));
//# sourceMappingURL=app.js.map