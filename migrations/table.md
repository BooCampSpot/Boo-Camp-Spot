Table 1: Types
    - typeID: [INT, AUTO_INCREMENT, PRIMARY KEY]
    - name: [VARCHAR]

Table 2: user
    - userID: [INT, AUTO_INCREMENT, PRIMARY KEY]
    - name: [VARCHAR]

TABLE 3: hauntedPlaces
    - hauntedID: [INT, AUTO_INCREMENT, PRIMARY KEY]
    - typeID: [INT, FOREIGN_KEY]
    - name: [VARCHAR]
    - location: [VARCHAR]
    - description: [VARCHAR]

Table 4: Review
    - reviewID: [INT, AUTO_INCREMENT, PRIMARY KEY]
    - hauntedID: [INT, FOREIGN_KEY]
    - title: [VARCHAR]
    - body: [VARCHAR]
    - rating: [INT]
    - userID: [INT, FOREIGN_KEY]