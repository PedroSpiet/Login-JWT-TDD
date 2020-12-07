module.exports = {
  host: "localhost",
  port: "5432",
  username: "postgres",
  password: "docker",
  database: "nodeauth",
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}