package com.example.dao;


import com.example.model.User;
import org.springframework.stereotype.Repository;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDAOImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @SuppressWarnings("unchecked")
    public List<User> listUsers() {
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();

    }
    @Override
    public User getUserById(int id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);

    }

    @Override
    public void removeUser(int id) {
        Query query = entityManager.createQuery("delete FROM User where id = :id").setParameter("id", id);
        query.executeUpdate();
    }
    @Override
    public Optional<User> findByUsername(String username) {
        Query query = entityManager.createQuery(" SELECT u from User u where u.username = : username").setParameter("username", username);
        return Optional.of ((User) query.getSingleResult());
    }

    @Override
    public User getUserByNameWithRoles(String username) {
        return entityManager.createQuery("SELECT u FROM User u JOIN FETCH u.roles roles where u.username = :username ", User.class).setParameter("username", username).getSingleResult();
    }

}
