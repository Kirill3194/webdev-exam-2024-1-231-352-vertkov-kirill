async function addOrdersToPage() {
  const table = document.getElementById('order-table-body');
  table.innerHTML = '';

  const orders = await getOrders();
  const rows = await Promise.all(
    orders.map(async (order) => {
      let name_ct = '';
      if (order.tutor_id == 0) {
        const course = await getCourseById(order.course_id);
        name_ct = course.name;
      } else {
        const tutor = await getTutorById(order.tutor_id);
        name_ct = tutor.name;
      }
      return `
        <tr>
          <td>${order.id}</td>
          <td>${name_ct}</td>
          <td>${order.date_start}</td>
          <td>${order.price}</td>
          <td>
            <button class="btn btn-info btn-details" data-order-id="${order.id}" data-bs-toggle="modal" data-bs-target="#orderDetailsModal">More Details</button>
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editOrderModal">Edit</button>
            <button class="btn btn-danger" data-order-id="${order.id}" data-bs-toggle="modal" data-bs-target="#deleteOrderModal">Delete</button>
          </td>
        </tr>
      `;
    })
  );

  table.insertAdjacentHTML('beforeend', rows.join(''));
}

addOrdersToPage();

document.addEventListener('DOMContentLoaded', function () {
  const saveChangesButton = document.getElementById('save-changes');
  saveChangesButton.addEventListener('click', function () {
    const courseName = document.getElementById('course-name').value;
    const lessonDate = document.getElementById('lesson-date').value;
    const totalCost = document.getElementById('total-cost').value;

    alert(`Order updated: ${courseName} on ${lessonDate} for $${totalCost}`);

    const editModal = bootstrap.Modal.getInstance(
      document.getElementById('editOrderModal')
    );
    editModal.hide();
  });

  const confirmDeleteButton = document.getElementById('confirm-delete');
  confirmDeleteButton.addEventListener('click', function () {
    const orderId = document.querySelector('.btn-danger').getAttribute('data-order-id');
    alert('Order deleted: ' + orderId);
    
    deleteOrder(orderId).then(response => {
      console.log(response);
      addOrdersToPage();
    });

    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById('deleteOrderModal')
    );
    deleteModal.hide();

  });

  const detailsModal = document.getElementById('orderDetailsModal');
  const modalBody = detailsModal.querySelector('.modal-body');

  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('btn-details')) {
      const orderId = event.target.getAttribute('data-order-id');

      const order = await getOrderById(orderId);
      let name_ct = '';
      if (order.tutor_id == 0) {
        const course = await getCourseById(order.course_id);
        name_ct = course.name;
      } else {
        const tutor = await getTutorById(order.tutor_id);
        name_ct = tutor.name;
      }

      modalBody.innerHTML = `
        <p><strong>Order number:</strong> ${order.id}</p>
        <p><strong>Course/Tutor:</strong> ${name_ct}</p>
        <p><strong>Start date:</strong> ${order.date_start}</p>
        <p><strong>Start time:</strong> ${order.time_start}</p>
        <p><strong>Number of people:</strong> ${order.persons}</p>
        <p><strong>Price:</strong> ${order.price} RUB</p>
      `;
    }
  });
});
