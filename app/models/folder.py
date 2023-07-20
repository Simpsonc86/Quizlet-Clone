from .db import db, environment, SCHEMA, add_prefix_for_prod
from.set import Set


class Folder(db.Model):
    __tablename__ = 'folders'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(2000), nullable = False)
    is_public = db.Column(db.String, nullable = False, default="yes")

    user = db.relationship("User", back_populates="folders")
    sets = db.relationship("Set", back_populates="folder",cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "title":self.title,
            "description":self.description,
            "is_public":self.is_public,
            "user":self.user.to_dict(),
            "sets":{set["id"]:set.to_dict() for set in self.sets} 
        }
    
    def to_dict_without_sets_or_user(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "title":self.title,
            "description":self.description,
            "is_public":self.is_public
        }


