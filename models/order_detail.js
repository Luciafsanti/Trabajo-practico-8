'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //order_detail.belongsTo(models.order, {
      //  foreignKey: 'order_id'
      //});
      //order_detail.belongsTo(models.product, {
      //  foreignKey: 'product_id'
      //});
    }
  }
  order_detail.init({
    detail_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    order_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_detail:{
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'order_detail',
    timestamps: false
  });
  return order_detail;
};

/*
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    product_price FLOAT NOT NULL,
    total_detail FLOAT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (product_price) REFERENCES products(price)
*/