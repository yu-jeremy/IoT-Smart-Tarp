# A Prototype for an IoT Smart Tarp

A final project for my CSE 222: Internet of Things class at Washington University in St. Louis

### Explaining Filesystem

1. **Documentation** - contains relevant images, developer README, and user README
2. **SmartTarp** - contains the main source file for running the Smart Tarp hard-ware
3. **UI** - contains the files that have to do with user interface, including
JavaScript, HTML, and CSS files in addition to extra resources

### Conceptual Backing

With a automated smart tarpaulin, I hope that the difficulties of being dependent on human availability and manual labor can be made to be more convenient and/or solved. My solution aims to have a hardware component that will simulate an actual automated tarp. This tarp will be retractable through the use of a continuous rotation servo. I hope to mount a camera that will face outwards (in the direction the tarp is extend) so that the user can take and access photos to see the current conditions under which their belongings and tarp are operating (and so they can act accordingly). Additionally, the addition of a temperature and humidity sensor (either two - one on the tarp, one under or just one under the sensor) can help the user assess the environment that their belongings are in.

Furthermore, my solution will involve networking through the cloud (most likely using the same Particle libraries we've used in class). In this way, I can sync my web application, the actual tarpaulin hardware, and possibly a remote control. The user can extend and retract the tarp and I may program the tarp such that the user can also stop the tarp's motion before reaching a fully extended or fully retracted state.

### Back-End Design

The back-end is completed in C++ and the Cloud infrastructure I utilized is Particle's Cloud API.

### Front-End Design

I used HTML, CSS, and JavaScript for my front-end while also roping in a front-end framework called Bootstrap. Bootstrap provides many useful UI components that look great on screen. Read more [here](https://getbootstrap.com/).

### Documentation and References

1. [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)

2. [Learning about Velostat](https://learn.adafruit.com/firewalker-led-sneakers?view=all#circuit-diagram)

3. [Learning About Pin Relations](https://community.particle.io/t/i2c-information/4667)
