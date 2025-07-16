const delivery = document.getElementById("delivery");
const people = document.getElementById("people");
const basePrice = 2000;
const userName = document.getElementById("userName");
const payment = document.getElementById("payment");

function updateEstimate() {
    const deliveryCost = parseInt(delivery.value);
    const peopleCount = parseInt(people.value);
    let peopleCost = 0;
    if (peopleCount >= 2) {
        peopleCost = (peopleCount - 1) * 1000;
    }
    const total = basePrice + peopleCost + deliveryCost;
    document.getElementById("basePrice").textContent = `￥${basePrice.toLocaleString()}`;
    document.getElementById("peoplePrice").textContent = `￥${peopleCost.toLocaleString()}`;
    document.getElementById("deliveryPrice").textContent = `￥${deliveryCost.toLocaleString()}`;
    const totalElement = document.getElementById("totalPrice");
    totalElement.textContent = `￥${total.toLocaleString()}`;
    totalElement.style.animation = "none";
    void totalElement.offsetWidth;
    totalElement.style.animation = "flash 0.5s";
}

delivery.addEventListener("change", updateEstimate);
people.addEventListener("input", updateEstimate);
updateEstimate();
document.body.classList.add("fade-in");

document.getElementById("dummyButton").addEventListener("click", () => {
    if (!userName.value.trim()) {
        alert("お名前を入力してください");
        return;
    }
    document.getElementById("form-section").style.display = "none";
    document.getElementById("template-section").style.display = "block";
    generateTemplate();
});

document.getElementById("copyButton").addEventListener("click", () => {
    const textArea = document.getElementById("templateText");
    textArea.select();
    document.execCommand("copy");
    alert("テンプレートをコピーしました！");
});

function generateTemplate() {
    const deliveryText = delivery.options[delivery.selectedIndex].text.split("（")[0];
    const paymentValue = payment.value;
    const peopleCount = parseInt(people.value);
    const peopleCost = peopleCount >= 2 ? (peopleCount - 1) * 1000 : 0;
    const deliveryCost = parseInt(delivery.value);
    const total = basePrice + peopleCost + deliveryCost;
    let bankInfo = "";
    if (paymentValue === "銀行振込") {
        bankInfo = `
・振込口座
銀行名:みんなの銀行
支店名:ハーバーブリッジ支店
口座番号:普通預金 3927902
名前:フジイ ムガ`;
    }
    const template = `${userName.value} 様

曲名(URL):

音源提出(ギガファイル便推奨):

要望や質問など:

⟡.·*.··············································⟡.·*.

概算見積もり内容

・納期:音源提出から${deliveryText}
・人数:${peopleCount}人
・お支払い方法:${paymentValue}
${bankInfo}

詳細
・基本金額 ¥${basePrice.toLocaleString()}
・人数金額 ¥${peopleCost.toLocaleString()}
・納期短縮 ¥${deliveryCost.toLocaleString()}
・合計 ¥${total.toLocaleString()}

⟡.·*.··············································⟡.·*.
`;
    document.getElementById("templateText").value = template;
}

document.getElementById("openDmButton").addEventListener("click", () => {
    const template = document.getElementById("templateText").value;
    const encoded = encodeURIComponent(template);
    const dmUrl = `https://twitter.com/messages/compose?recipient_id=1383767382955487245&text=${encoded}`;
    window.open(dmUrl, "_blank");
});
