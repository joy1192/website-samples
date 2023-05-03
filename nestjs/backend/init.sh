echo "start"
ssh-keygen -t rsa -m pem -b 4096 -f ./dist/private-key.pem
ssh-keygen -f ./dist/private-key.pem.pub -e -m pem > ./dist/public-key.pem

sed ':a;N;$!ba;s/\n/\\n/g' ./dist/private-key.pem > ./dist/private-key-escape.pem
sed ':a;N;$!ba;s/\n/\\n/g' ./dist/public-key.pem > ./dist/public-key-escape.pem

touch .env.local

echo -n "PRIVATE_KEY=\"" >> .env.local
head -n 1 ./dist/private-key-escape.pem | tr -d '\n' >> .env.local
echo "\"" >> .env.local
echo -n "PUBLIC_KEY=\"" >> .env.local
head -n 1 ./dist/public-key-escape.pem | tr -d '\n' >> .env.local
echo "\"" >> .env.local

rm ./dist/private-key.pem ./dist/private-key.pem.pub ./dist/public-key.pem ./dist/private-key-escape.pem ./dist/public-key-escape.pem