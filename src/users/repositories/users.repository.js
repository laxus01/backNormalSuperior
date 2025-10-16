const db = require("../../database");

class UsersRepository {
  async findUserByCredentials(login, password) {
    const query = "SELECT * FROM users WHERE user = ? AND password = ?";
    const result = await db.query(query, [login, password]);
    return result[0];
  }

  async findById(userId) {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await db.query(query, [userId]);
    return result[0];
  }

  async findByUsername(username) {
    const query = "SELECT * FROM users WHERE user = ?";
    const result = await db.query(query, [username]);
    return result[0];
  }

  async createUser(userData) {
    const { user, password, name, permissions } = userData;
    
    const query = "INSERT INTO users (user, password, name, permissions) VALUES (?, ?, ?, ?)";
    const values = [user, password, name, permissions || 'user'];
    
    return await db.query(query, values);
  }

  async updateUser(userId, userData) {
    const { name, permissions } = userData;
    
    const query = "UPDATE users SET name = ?, permissions = ? WHERE id = ?";
    const values = [name, permissions, userId];
    
    return await db.query(query, values);
  }

  async updatePassword(userId, newPassword) {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    return await db.query(query, [newPassword, userId]);
  }
}

module.exports = new UsersRepository();
