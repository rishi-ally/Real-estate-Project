const Host = require('./models/Host');
const House = require('./models/House');
const linkingboth = async () => {
  try {
    const house = await House.findById("67a71c03ef107caf2e5b897e");
    const hosts = await Host.find();
    if (hosts.length === 0) {
      console.log("No hosts found");
      return;
    }
    const houses = await House.find();
    if (houses.length === 0) {
      console.log("No houses found!");
      return;
    }

    for (const house of houses) {
      if (house.hostId === "" || house.hostId === null) {
        const randomHost = hosts[Math.floor(Math.random() * hosts.length)];
        house.hostId = randomHost._id;
        await house.save();
        randomHost.listings.push(house._id);
        await randomHost.save();
        console.log(`✅ Updated House: ${house.title} -> HostId: ${randomHost._id}`);
      }
    }

    console.log("✅ Hosts and houses successfully linked!");

  } catch (error) {
    console.error("❌ Error linking hosts and houses:", error);
  }
};

module.exports = linkingboth;
