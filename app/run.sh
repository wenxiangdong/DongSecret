docker run -v "$(PWD)":/data $1 \
yarn && \
yarn $2
