module.exports = async(message, guild, client) => {
    if(!guild.available) return;
    const channel = client.channels.get('706376972712017930');
    const em = new RichEmbed();
    em.setTitle("mystbot joined a server");
    em.setDescription(guild.name);
    em.setColor(0xFF00FF);
    em.setThumbnail(guild.iconURL());
    em.addField('Owner', guild.owner.user.tag);
    em.addField('Member Count', guild.memberCount);;
    em.setFooter('Mystbot v0.01');
    em.setTimestamp();

    await channel.send(em).catch(() => null);
};
