var memoryStauts=require('./memoryStauts')
class memory{
    constructor(
        userID='',
        name='',
        like=[],
        text='',
        title='',
        comment=[],
        date=new Date(),
        status=memoryStauts.pending
    ){  
        this.userID=userID,
        this.name=name,
        this.like=like,
        this.comment=comment,
        this.text=text,
        this.title=title,
        this.date=date
        this.status=status
    }
}
module.exports=memory