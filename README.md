# Boids

This simulates a boid. A boid is an artificial life program that simulates the flocking behavior of birds. Boid is short for bird-oid object.

This simulation follows the 3 rules for simple boids. These are alignment, cohesion, and repulsion. 
Alignment allows for the birds to head in the average direction that the other birds are flying in.
Cohesion keeps the birds close together by "flying" toward the center of mass of the group.
Repulsion does the opposite of cohesion and does not allow for the birds to hit each other.

Another rule was added into this simulation such that the birds can only see the birds in front of it and will only steer according to the birds in front of it. 
