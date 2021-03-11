FROM rust:1.50 as builder
WORKDIR /usr/src

RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y musl-tools && \
    rustup target add x86_64-unknown-linux-musl

RUN cargo new mock-api
WORKDIR /usr/src/mock-api
COPY Cargo.toml Cargo.lock ./
RUN cargo install --target x86_64-unknown-linux-musl --path .
RUN rm src/*.rs

ADD src ./src
RUN touch src/main.rs

RUN cargo install --target x86_64-unknown-linux-musl --path .

FROM scratch
EXPOSE 12000
COPY --from=builder /usr/local/cargo/bin/area-mock-api .
CMD ["./area-mock-api", "--ip", "0.0.0.0"]
