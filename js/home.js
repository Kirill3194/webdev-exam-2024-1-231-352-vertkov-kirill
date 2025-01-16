function addOrdersToPage() {
  getOrders().then(orders => {
    let table = document.getElementById('order-table-body');
    for (let order of orders) {
      table.insertAdjacentHTML('beforeend', `<tr>
        <td>${order.id}</td>
        <td>Beginner Russian</td>
        <td>2025-01-20</td>
        <td>$100</td>
        <td>
          <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#orderDetailsModal">Подробнее</button>
          <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editOrderModal">Изменить</button>
          <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteOrderModal">Удалить</button>
        </td>
      </tr>`);
    }
  })
}
addOrdersToPage();

document.addEventListener("DOMContentLoaded", function() {

    // Обработчик для кнопки "Save Changes" (сохранение изменений в заказе)
    const saveChangesButton = document.getElementById('save-changes');
    saveChangesButton.addEventListener('click', function() {
      const courseName = document.getElementById('course-name').value;
      const lessonDate = document.getElementById('lesson-date').value;
      const totalCost = document.getElementById('total-cost').value;
  
      // Здесь можно добавить логику для сохранения изменений на сервере
      alert(`Order updated: ${courseName} on ${lessonDate} for $${totalCost}`);
  
      // Закрытие модального окна после сохранения
      const editModal = bootstrap.Modal.getInstance(document.getElementById('editOrderModal'));
      editModal.hide();
    });
  
    // Обработчик для кнопки "Delete" (подтверждение удаления заказа)
    const confirmDeleteButton = document.getElementById('confirm-delete');
    confirmDeleteButton.addEventListener('click', function() {
      // Здесь можно добавить логику для удаления заказа с сервера
      alert('Order deleted');
  
      // Закрытие модального окна после удаления
      const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteOrderModal'));
      deleteModal.hide();
    });
  });

