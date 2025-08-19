// Simple test script to verify backend-frontend connection
const axios = require("axios");

async function testConnection() {
  try {
    console.log("Testing backend connection...");

    // Test health endpoint
    const healthResponse = await axios.get("http://localhost:5000/api/health");
    console.log("✅ Health endpoint:", healthResponse.data);

    // Test registration
    const testUser = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    console.log("\nTesting user registration...");
    try {
      const registerResponse = await axios.post(
        "http://localhost:5000/api/auth/register",
        testUser
      );
      console.log("✅ Registration successful:", registerResponse.data);
    } catch (regError) {
      if (regError.response?.status === 409) {
        console.log("⚠️ User already exists, trying login...");
      } else {
        console.log("❌ Registration error:", regError.response?.data);
      }
    }

    // Test login
    console.log("\nTesting user login...");
    try {
      const loginResponse = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: testUser.email,
          password: testUser.password,
        }
      );
      console.log("✅ Login successful:", loginResponse.data);

      // Test protected route with token
      const token = loginResponse.data.data.token;
      console.log("\nTesting protected route...");
      const profileResponse = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Profile endpoint:", profileResponse.data);
    } catch (loginError) {
      console.log("❌ Login error:", loginError.response?.data);
    }
  } catch (error) {
    console.log("❌ Connection test failed:", error.message);
  }
}

testConnection();
