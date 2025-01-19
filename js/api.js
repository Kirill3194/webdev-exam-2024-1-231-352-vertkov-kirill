const url = "http://cat-facts-api.std-900.ist.mospolytech.ru";
const api_key = "?api_key=138a6bca-f0ae-4bed-9d91-3982cf51178d"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function getCourses() {
    const path = "/api/courses"
    try {
      const response = await fetch(url + path + api_key);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function getCourseById(id) {
    const path = `/api/courses/${id}`
    try {
      const response = await fetch(url + path + api_key);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}


async function getTutors() {
    const path = "/api/tutors"
    try {
      const response = await fetch(url + path + api_key);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function getTutorById(id) {
    const path = `/api/tutors/${id}`
    try {
      const response = await fetch(url + path + api_key);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function getOrders() {
    const path = "/api/orders"
    try {
      const response = await fetch(url + path + api_key);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function getOrderById(id) {
    const path = `/api/orders/${id}`
    try {
      const response = await fetch(url + path + api_key);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function addOrder(body) {
    const path = "/api/orders"
    try {
      const request = new Request(url + path + api_key, { 
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
      },
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function editOrder(body, id) {
    const path = `/api/orders/${id}`
    try {
      const request = new Request(url + path + api_key, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: myHeaders
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}

async function deleteOrder(id) {
    const path = `/api/orders/${id}`
    try {
      const request = new Request(url + path + api_key, {
        method: "DELETE",
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error(error.message);
    }
}
