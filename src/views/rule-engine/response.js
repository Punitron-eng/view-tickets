// rule engine page 1 get /get-rule-list and status 
[
  {
    "vendorID":"123456",
    "active_status":'Active'
  }
]


// rule Engine /update-rule-status.php
{
  "vendorId":'1232',
  "rule_name":"Quick Ship"
  "active_status":'Active'
}
// rule Engine /update-rule-status.php

// max 10 active rule only allowed else error from backend side 

// rule Engine /update-rule-priority.php
{
  "vendorId":'1232',
  "rule_name":"Quick Ship"
  "active_status":'Active'
}
// rule Engine /update-rule-priority.php

// rule Engine /get-rule-clone-data.php

      // should navigate to the rule engine page 2 with the id and make the same rule as the clone one 

// rule Engine /get-rule-clone-data.php

// rule engine Page 1 




// rule engine /add-rule-submit.php
// submit  the response in the array formate formate is yet to be decided 

// rule engine /add-rule-submit.php



[
    {
      "rule_name":"Quick Ship",
      "rule":[
        {"label":"payment","value":"COD"},
        {"label":"Weight","value":"Greater than 10KG"},
        {"label":"Zone","value":"A,B"}
      ],
      "rule_courier_priority":{
        "label":"Best Rated ",
        "logistic_logo":[]  
      },
      "active":false,
      "priority":1
    },
      {
      "rule_name":"Quick Ship",
      "rule":[
        {"label":"payment","value":"COD"},
        {"label":"Weight","value":"Greater than 10KG"},
        {"label":"Zone","value":"A,B"}
      ],
      "rule_courier_priority":{
        "label":"Custom",
        "logistic_logo":["imgName","imgName","imgName","imgName"]  
      },
      "active":true,
      "priority":2
    }
  ]

// rule engine Page 1 


// rule engine Page 3 

[
    {
        logistic_name:'Blue Dart',
        logistic_logo:'ImgName',
        logistic_rating:"4.3",
        logistic_pickup:'3.2',
        logistic_delivery:'3.2',
        logistic_ndr:'3.2',
        logistic_weight_case:'3.2',
        logistic_isChecked:false,
    },
    {
        logistic_name:'DHL',
        logistic_logo:'ImgName',
        logistic_rating:"4.3",
        logistic_pickup:'3.2',
        logistic_delivery:'3.2',
        logistic_ndr:'3.2',
        logistic_weight_case:'3.2',
        logistic_isChecked:true,
    },
    {
        logistic_name:'Delhivery',
        logistic_logo:'ImgName',
        logistic_rating:"4.3",
        logistic_pickup:'3.2',
        logistic_delivery:'3.2',
        logistic_ndr:'3.2',
        logistic_weight_case:'3.2',
        logistic_isChecked:false,
    },
]

// rule engine Page 3 
