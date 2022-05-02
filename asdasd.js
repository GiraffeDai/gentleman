function autoGrow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}

function send(btn) {
  var content = document.getElementById("commentTextArea").value;
    if (content.length <= 0) {
      showErrorAlert("請輸入內容");
        return;
    }

    if (content.indexOf('http://') != -1 || content.indexOf('https://') != -1){
        showErrorAlert("禁止輸入網址");
        return;
    }

    document.getElementById("commentTextArea").value = "";

    btn.disabled = true;
    setTimeout(function(){
        btn.disabled = false;
    },2000);

    fetch(
        'https://discord.com/api/webhooks/970648427765583942/PGwruwr5hgHo6Y3jssdbbR1vUMPIrGLn5TB_wG8B2ya5-dPsSO3ud1CST23eKYP5nNUc',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [
                    {
                        description: content
                    }
                ],
            }),
        }
    ).then(function (response) {
      if (response["status"] != null) {
        if (response["status"] == 204) {
          showSuccessAlert("送出成功")
        } else {
          showErrorAlert('發生錯誤，請稍後再試');
        }
      }
    });
}

function showSuccessAlert(message) {
  Swal.fire({
    icon: 'success',
    text: message
  });
}

function showErrorAlert(message) {
  Swal.fire({
    icon: 'error',
    text: message
  });
}