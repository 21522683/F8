
function Validator(options) {

  function getParent(element, selector) {
    while(element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  // Thực hiện validate input
  var validate = function (inputElement, rule) {

    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
    var errorMessage;

    switch (inputElement.type) {
      case 'radio':
        errorMessage = rule.test(formElement.querySelector(rule.selector + ':checked'));
        break;
      case 'checkbox':
        errorMessage = rule.test(formElement.querySelector(rule.selector + ':checked'));
        break;
      default:
        errorMessage = rule.test(inputElement.value);
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add("invalid");
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
    }

    return !errorMessage;
  };

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    // Xử lý submit
    formElement.onsubmit = function (e) {
      e.preventDefault();
      var isFormValid = true;

      options.rules.forEach(function (rule) {

        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);

        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {

          var enableInputs = formElement.querySelectorAll("[name]");
          var formValues = Array.from(enableInputs).reduce((values,input) => {
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                break;
              case "checkbox":
                if (!input.matches(':checked')) return values;
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value)
                break;
              case "file":
                values[input.name] = input.files
                break;
              default: 
                values[input.name] = input.value;
            }
            return values;
          }, {});

          options.onSubmit(formValues);
        }
      }
    };

    // Xử lý nhập
    options.rules.forEach(function (rule) {
      var inputElements = formElement.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach(function (inputElement){
        // Xử lý trường hợp blur , hover hay bấm ra ngoài ô input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xử lý mỗi khi người dùng nhập
        inputElement.oninput = function () {
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
        };
        inputElement.onchange = function () {
          validate(inputElement, rule);
        }
      })
        
    });
  }
}

Validator.isFullName = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập họ tên !";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (value.trim().length === 0) {
        return "Vui lòng nhập email!";
      } else {
        if (!regex.test(value.trim())) {
          return "Email không đúng định dạng!";
        } else {
          return undefined;
        }
      }
    },
  };
};

Validator.isPassword = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.trim().length === 0) {
        return "Vui lòng nhập password!";
      } else {
        if (value.trim().length < 8) {
          return "Password phải ít nhất 8 ký tự!";
        } else {
          return undefined;
        }
      }
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue) {
  return {
    selector: selector,
    test: function (value) {
      if (value.trim().length === 0) {
        return "Vui lòng nhập lại password!";
      } else {
        if (value.trim() === getConfirmValue()) {
          return undefined;
        } else {
          return "Password không trùng khớp!";
        }
      }
    },
  };
};

Validator.isGender_Radio = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value)
      {
        return undefined;
      }
      else
      {
        return "Vui lòng chọn giới tính !"
      }
    },
  };
};

Validator.isProvince = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value)
      {
        return undefined;
      }
      else
      {
        return "Vui lòng chọn tỉnh thành !"
      }
    },
  };
}

Validator.isOptions = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value)
      {
        return undefined;
      }
      else
      {
        return "Vui lòng chọn option bạn muốn !"
      }
    },
  };
}

Validator.isFile = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value)
      {
        return undefined;
      }
      else
      {
        return "Vui lòng chọn file !"
      }
    },
  };
} 