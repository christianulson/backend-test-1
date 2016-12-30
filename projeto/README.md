# Backend Test

## Running locally

### Setup
```
- Linux (or a VM)
- Get [docker](https://docker.com)
- Get [docker-compose](https://github.com/docker/compose)
```


no Linux/Mac

apagar os arquivos:
  docker-compose.yml
  package.json

remover as extenções dos arquivos
  docker-compose.yml.linuxMac
  package.json.linuxMac


no Windows - Virtual box
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



### Running
Executa rapenas na primeira vez
```
> docker-compose run -d --rm catho npm install
```

Para rodar o projeto
```
> docker-compose up -d
```

Para atualizar apos alguma alteração
```
> docker-compose restart
```

Para rodar os Testes unitários
```
> docker-compose run --rm catho bash
> npm test
```


## Deploying

### TODO


