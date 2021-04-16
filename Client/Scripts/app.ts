
namespace core
{
   
    function testFullName(): void
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber(): void
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress():void
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation():void
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact(): void
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          let subscribeCheckbox = $("#subscribeCheckbox")[0] as HTMLInputElement;
          let fullName = $("#fullName")[0] as HTMLInputElement;
          let contactNumber = $("#contactNumber")[0] as HTMLInputElement;
          let emailAddress = $("#emailAddress")[0] as HTMLInputElement;

          if(subscribeCheckbox.checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }

          location.href = '/contact';
        });
    }

    function displayContactList() :void
    {
      // confirm deletion
      $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
          event.preventDefault();
          location.href = '/contact-list';
        }       
      });
    }

    function displayEdit(): void
    {
      // form validation
      formValidation();
     } 

    function displayLogin():void
    {
      // any validation will be done here
      
    }

    /***************************************************     displayRegister       ***************************************** */
    
        /**
         * check the validation of first name in register form
         * by comparing the input string with name pattern
         */
        function CheckFirstName()
        {
          let errorMessage = $("#errorMessage");
          let namePattern = /^[A-Z][a-z]+$/;
        
          $("#firstName").on("blur", function()
          {
            if(!namePattern.test($(this).val().toString()))
            {
              $("#hintText").hide();
              errorMessage
                .show()
                .addClass("alert alert-danger")
                .text("Please enter a valid Name. First name should have at least 2 characters and start with a uppercase letter.");
              $(this).trigger("focus").trigger("select");
            }
            else
            {
              errorMessage.removeAttr("class").hide();
              $("#hintText").show();
            }
          });
        }
    
        /**
         * check the validation of last name in register form
         * by comparing the input string with name pattern
         */
        function CheckLastName()
        {
          let errorMessage = $("#errorMessage").hide();
          let namePattern = /^[A-Z][a-z]+$/;
    
          $("#lastName").on("blur", function () 
          {
            let validation = namePattern.test($(this).val().toString());
            if (!validation) 
            {
              $("#hintText").hide();
              errorMessage
                .show()
                .addClass("alert alert-danger")
                .text("Please enter a valid Name. Last name should have at least 2 characters and start with a uppercase letter.");
              $(this).trigger("focus").trigger("select");
            } 
            else 
            {
              errorMessage.removeAttr("class").hide();
              $("#hintText").show();
            }
          });
        }
    
        /**
         * check the validation of email address in register form
         * by comparing the input string with email pattern
         */
        function CheckEmail()
        {
          let errorMessage = $("#errorMessage").hide();
          let emailPattern = /^([a-zA-Z0-9._%-]{8,}@[a-zA-Z0-9-]{4,}\.[a-zA-Z]{2,6})*$/;
    
          $("#emailAddress").on("blur", function () 
          {
            let validation = emailPattern.test($(this).val().toString());
            if (!validation) 
            {
              $("#hintText").hide();
              errorMessage
                .show()
                .addClass("alert alert-danger")
                .text("Please enter a valid Email Address.");
              $(this).trigger("focus").trigger("select");
            } 
            else 
            {
              errorMessage.removeAttr("class").hide();
              $("#hintText").show();
            }
          });
        }

        /**
         * check the validation of user name in register form
         * by comparing the input string with name pattern
         */
         function CheckUsername()
         {
           let errorMessage = $("#errorMessage").hide();
           let namePattern = /^([a-zA-Z][a-zA-Z0-9]{4,})+$/;
     
           $("#username").on("blur", function () 
           {
             let validation = namePattern.test($(this).val().toString());
             if (!validation) 
             {
               $("#hintText").hide();
               errorMessage
                 .show()
                 .addClass("alert alert-danger")
                 .text("Please enter a valid Name. User name should have at least 5 letters or number which starting with letter.");
               $(this).trigger("focus").trigger("select");
             } 
             else 
             {
               errorMessage.removeAttr("class").hide();
               $("#hintText").show();
             }
           });
         }
         
        /**
         * check the validation of password in register form
         * by comparing the input string with password pattern
         */
        function CheckPassword()
        {
          let errorMessage = $("#errorMessage").hide();
          let passwordPattern = /^([a-zA-Z0-9._%-]{6,})*$/;
    
          // check the length and pattern of password
          $("#password").on("blur", function () 
          {
            let validation = passwordPattern.test($(this).val().toString());
            if (!validation || $(this).val() == "")
            {
              $("#hintText").hide();
              errorMessage
                .show()
                .addClass("alert alert-danger")
                .text("Please enter a valid password. It should have at least 6 characters.");
              $(this).trigger("focus").trigger("select");
            } 
            else 
            {
              errorMessage.removeAttr("class").hide();
              $("#hintText").show();
            }
          });
        }
    
        /**
         * check the validation of password in register form                                                     Lab 2 : 2(e)
         * by comparing the input string with confirm password pattern
         * check whether both password and confirm password are the same
         */
        function CheckConfirmPassword()
        {
          let errorMessage = $("#errorMessage").hide();
          let passwordPattern = /^([a-zA-Z0-9._%-]{6,})*$/;
    
          // check the length and pattern of confirm password
          $("#confirmPassword").on("blur", function () 
          {
            let validation = passwordPattern.test($(this).val().toString());
            if (!validation || $(this).val() == "")
            {
              $("#hintText").hide();
              errorMessage
                .show()
                .addClass("alert alert-danger")
                .text("Please enter a confirm password. It should have at least 6 characters.");
              $(this).trigger("focus").trigger("select");
            }
            else
            { 
              // check whether password matches with confirmed password
              if($("#password").val() !== $(this).val()) 
              {
                $("#hintText").hide();
                errorMessage
                .show()
                .addClass("alert alert-danger")
                .text("Password didn't match. Please enter again.");
                $(this).val('');
                $("#password").val('');
                $("#password").trigger("focus").trigger("select");
              }
              else
              {
                errorMessage.removeAttr("class").hide();
                $("#hintText").show();
              }
            }
          });
        }
    
        function RegisterValidation()
        {
          CheckFirstName();
          CheckLastName();
          CheckEmail();
          CheckUsername();
          CheckPassword();
          CheckConfirmPassword();
        }
    
    function displayRegister():void
    {
      // any validation will be done here
      RegisterValidation();
    }

     /**
     * This is the entry point for our program
     *
     */
    function Start(): void
    {
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

}