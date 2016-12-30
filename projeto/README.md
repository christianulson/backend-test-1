# Backend Test

## Running locally

### Setup
```
- Linux (or a VM)
- Get [docker](https://docker.com)
- Get [docker-compose](https://github.com/docker/compose)
```
### Running
Only for the first time
```
> docker-compose run -d --rm catho npm install
```

To start the project run
```
> docker-compose up -d
```

To restart after a change in source code for example, run
```
> docker-compose restart
```

To run unit tests
```
> docker-compose run --rm catho bash
> npm test
```




no Windows
...

conect to docker-machine
docker-machine ssh default
>
Criar arquivo
cd /
>vi "/mnt/sda1/var/lib/boot2docker/bootlocal.sh"
Texto dentro do arquivo
>mkdir -p <local_dir>
>mount -t vboxsf -o defaults,uid=`id -u docker`,gid=`id -g docker` <mount_name> <local_dir>

exemplo :
>mkdir -p Projetos
>mount -t vboxsf -o defaults,uid=`id -u docker`,gid=`id -g docker` Projetos Projetos
Onde Projetos é a Pasta do virtual box
...
para fechar e gravar o arquivo
  :x

## Deploying

### TODO


