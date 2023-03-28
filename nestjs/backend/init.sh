openssl genrsa -out ./dist/private-key.pem
openssl rsa -in ./dist/private-key.pem -pubout -out ./dist/public-key.pem
sed ':a;N;$!ba;s/\n/\\n/g' ./dist/private-key.pem > ./dist/private-key-escape.pem
sed ':a;N;$!ba;s/\n/\\n/g' ./dist/public-key.pem > ./dist/public-key-escape.pem

touch .env.local
> .env.local

echo -n "PRIVATE_KEY=\"" >> .env.local
head -n 1 ./dist/private-key-escape.pem | tr -d '\n' >> .env.local
echo "\"" >> .env.local
echo -n "PUBLIC_KEY=\"" >> .env.local
head -n 1 ./dist/public-key-escape.pem | tr -d '\n' >> .env.local
echo "\"" >> .env.local

rm ./dist/private-key.pem ./dist/public-key.pem ./dist/private-key-escape.pem ./dist/public-key-escape.pem