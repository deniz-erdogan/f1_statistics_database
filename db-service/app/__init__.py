import mysql.connector

mydb = mysql.connector.connect(
  host="db",
  user="root",
  password="password",
  auth_plugin='mysql_native_password',
)

cursor = mydb.cursor(dictionary=True)
cursor.execute("USE formula")
