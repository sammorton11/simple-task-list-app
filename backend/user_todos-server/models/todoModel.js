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
      }
   }, { timestamps: false, tableName: 'user_todos'});
   return Todo;
}
