# HOW MANY WORDS TO CONVERT TO JS ARRAY
WORD_COUNT = 200000
MIN_LENGTH = 3

# READ THE FULL WORDLIST AND REMOVES SHORT WORDS
with open('wordlist.txt', encoding='utf-8') as wordlist:
    lines = wordlist.readlines()
    lines = [x.split('\t')[0] for x in lines]
    lines = [x for x in lines if len(x) >= MIN_LENGTH]

# CHECK ENOUGH WORDS TO FULLFILL REQUEST
if WORD_COUNT > len(lines):
    print(f'Unable to generate the output file, max word count: 300000')
else: 
    # WRITE TOP {WORD_COUNT} WORDS TO THE OUTPUT FILE
    with open(f'w{WORD_COUNT}.js', 'w', encoding='utf-8') as output:
        # ARRAY START
        output.write("const wordlist = [\n")
        for x in range(WORD_COUNT):
            output.write(f"  '{lines[x]}',\n")
        # ARRAY END
        output.write("\n]\n")
