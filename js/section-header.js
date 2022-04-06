const $headerIconBtn = document.querySelector('.product-shipment .product-section-header.sm-only .icon-button');

function openProductShipment() {
  const $productShipment = this.parentNode.parentNode
  $productShipment.classList.add('is-open');
}

$headerIconBtn.addEventListener('click', openProductShipment);