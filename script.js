const delivery = document.getElementById("delivery");
const people = document.getElementById("people");
const basePrice = 2000;

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

    // フラッシュアニメーション
    totalElement.style.animation = 'none';
    void totalElement.offsetWidth;
    totalElement.style.animation = 'flash 0.5s';
}

delivery.addEventListener("change", updateEstimate);
people.addEventListener("input", updateEstimate);

updateEstimate();

// ページロード時 fade-in 用
document.body.classList.add("fade-in");

// ダミーボタンアクション
document.getElementById("dummyButton").addEventListener("click", () => {
    alert("見積もりが確定されました！");
});
