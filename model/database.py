
################################################################################################################################

# ++from pathlib import Path
#                                                                                          !! you need to add if you look for something back
# print(Path.cwd())   ##  --- C:\Users\huseen marcelo\Desktop\Informatique\1_Visual\2_Project\Flask\2022\1_deathrow\project\model

# import sys
# sys.path.append(r"C:\Users\huseen marcelo\Desktop\Informatique\1_Visual\2_Project\Flask\2022\1_deathrow\project")

import sqlite3



# If it run from here 
if __name__ == "__main__":
    db = sqlite3.connect("deathrow.db", check_same_thread=False)

else:
    # --- Start from root parent ( 1_deathrow ) 
    
    # if you run from command line (main.py)
    db = sqlite3.connect("model/deathrow.db", check_same_thread=False)


################################################################################################################################

# @-- Hispanic

# Return list[] of tuples ()
hispanics_americans = db.execute("SELECT * FROM deathrow WHERE race = 'Hispanic'").fetchall()

# Display 6 each time
hispanic_silde_number = round(len(hispanics_americans) / 6)


###############################################################################################################################################

# @-- Afro-American

afro_americans = db.execute("SELECT * FROM deathrow WHERE race = 'Black'").fetchall()


afro_silde_number = round(len(afro_americans) / 6)


###############################################################################################################################################

# @-- White


europe_americans = db.execute("SELECT * FROM deathrow WHERE race = 'White'").fetchall()


europe_silde_number = round(len(europe_americans) / 6)

