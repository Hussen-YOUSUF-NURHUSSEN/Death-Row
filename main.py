
from flask import Flask, render_template, request, jsonify
import json
from model.database import hispanics_americans, hispanic_silde_number, afro_americans, afro_silde_number, europe_americans, europe_silde_number


app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


################################################################################################################################

@app.route("/")
def index():

    ''' First Run display first 6 people of each group '''

    HISPANICS_AMERCIANS = hispanics_americans[0:6]

    AFRO_AMERCIANS      = afro_americans[0:6]

    EUROPE_AMERICANS    = europe_americans[0:6]

    return render_template("index.html",hispanics_americans=HISPANICS_AMERCIANS, hispanic_number=hispanic_silde_number,
                                        afro_americans=AFRO_AMERCIANS,           afro_number=afro_silde_number,
                                        europe_americans=EUROPE_AMERICANS,       europe_number=europe_silde_number)


################################################################################################################################

@app.route("/query_database", methods=["GET", "POST"])
def add_hispanic():
    
    if request.method == "POST":

    # -- ------------------------------------------

        response     = json.loads(request.data)

        slide_number = response["slideNumber"]
        race         = response["raceClass"]
        demand       = response["requestDemande"]

    # -- ------------------------------------------

        if race == ".hispanic_page" :

            if demand == "next" :

                #  Get 6 person each time, starting from slide number
                request_hispanic = hispanics_americans[slide_number : slide_number + 6]

            elif demand == "preivous" :

                #  Get 6 person each time, starting from slide number
                request_hispanic = hispanics_americans[slide_number - 6 : slide_number]

            #  Return array[] of people in tuples() to javascript
            return jsonify(request_hispanic)

    # -- ------------------------------------------
        
        elif race == ".afro_page" :

            if demand == "next" :

                request_afro  = afro_americans[slide_number : slide_number + 6]

            else :
                request_afro  = afro_americans[slide_number - 6 : slide_number]

            return jsonify(request_afro)

    # -- ------------------------------------------
        
        elif race == ".white_page" :

            if demand == "next" :
                
                request_europe = europe_americans[slide_number : slide_number + 6]

            else :
                request_europe = europe_americans[slide_number - 6 : slide_number]


            return jsonify(request_europe)

    # -- ------------------------------------------



################################################################################################################################



if __name__ == '__main__':
    app.run(debug=True, port=9000)




