NAME	= sha256.js

FILE	= c_sha256.c

CFLAG = -s EXPORTED_FUNCTIONS="['_get_hashes_per_second']"

CC		= emcc

RM		= rm -fr

all: $(NAME)

$(NAME):
		$(CC) -o $(NAME) $(FILE) $(CFLAG)

clean:
	$(RM) $(NAME)
