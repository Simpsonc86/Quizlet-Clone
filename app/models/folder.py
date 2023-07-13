from .db import db, environment, SCHEMA, add_prefix_for_prod


class Folder(db.Model):
    __tablename__ = 'Folders'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Users.id")))
    title = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(2000), nullable = False)
    is_public = db.Column(db.Boolean, nullable = False, default=False)

    user = db.relationship("User", back_populates="folder")
    set = db.relationship("Set", back_populates="folder")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "title":self.title,
            "description":self.description,
            "is_public":self.is_public,
        }


