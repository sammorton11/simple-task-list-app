module.exports = (sequelize, DataTypes) => {
   const Todo = sequelize.define('todo', {
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      task: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1, 140]
         }
      },
      completed: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,
         validate: {
            len: [1, 1000]
         }
      },
      created_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW
      },
      updated_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW
      },
   }, { timestamps: false, tableName: 'user_todos'});
   return Todo;
}
