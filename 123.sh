sudo iptables -I INPUT 1 -p tcp --dport 4889 -j ACCEPT
sudo netfilter-persistent save
sudo netfilter-persistent reload
